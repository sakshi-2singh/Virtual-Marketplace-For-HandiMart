import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { Product, Review } from '../models/productModel.js'; // Update this path if necessary


// @desc    Fetch all products or filter by keyword/category
// @route   GET /api/products
// @access  Public
// export const getProducts = asyncHandler(async (req, res) => {
//   try {
//     const pageSize = 8;
//     const page = Number(req.query.pageNumber) || 1;
//     const keyword = req.query.keyword || '';
//     const category = req.query.category || '';

//     const whereConditions = {};

//     if (keyword) {
//       whereConditions.name = { [Op.like]: `%${keyword}%` };
//     }

//     if (category) {
//       whereConditions.category = { [Op.eq]: category };
//     }

//     const count = await Product.count({ where: whereConditions });

//     const products = await Product.findAll({
//       where: whereConditions,
//       limit: pageSize,
//       offset: pageSize * (page - 1),
//       order: [['createdAt', 'DESC']],
//     });

//     res.json({
//       products,
//       page,
//       pages: Math.ceil(count / pageSize),
//     });
//   } catch (error) {
//     console.error('Error in getProducts controller:', error.message);
//     res.status(500).json({ message: 'Failed to fetch products', error: error.message });
//   }
// });

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8; // Number of products per page
    const page = Number(req.query.pageNumber) || 1; // Current page number
    const keyword = req.query.keyword || '';
    const category = req.query.category || '';

    // Build where conditions for filtering
    const whereConditions = {};

    if (keyword) {
      whereConditions.name = { [Op.like]: `%${keyword}%` }; // Case-insensitive keyword search
    }

    if (category) {
      whereConditions.category = { [Op.like]: `%${category}%` }; // Case-insensitive category search
    }

    // Count total products matching the conditions
    const count = await Product.count({ where: whereConditions });

    // Fetch products with pagination and sorting
    const products = await Product.findAll({
      where: whereConditions,
      limit: pageSize,
      offset: pageSize * (page - 1),
      order: [['createdAt', 'DESC']], // Sort by creation date
    });

    // Return products, current page, and total pages
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// @desc    Fetch seller's products
// @route   GET /api/products/seller/:id
// @access  Private
export const getSellerProducts = asyncHandler(async (req, res) => {
  console.log('Authenticated user:', req.user); // Debug log to check the user object
   // const userId = req.params.id;
  const userId = req.user.id; // Use authenticated user's ID
  const products = await Product.findAll({ where: { userId } });
  res.json(products);
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (product) {
    await product.destroy();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a sample product
// @route   POST /api/products
// @access  Private/Admin or Seller
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      userId: req.user.id, // Sequelize: 'userId' matches your model
      name: 'Sample Product',
      price: 0,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      description: 'Sample description',
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
console.log("req.params.id",req.body.id)
  console.log("req.body",req.body)
  const product = await Product.findByPk(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Review, as: 'reviews' }],
  });

  if (product) {
    const alreadyReviewed = await Review.findOne({
      where: {
        productId: product.id,
        userId: req.user.id,
      },
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    try {
      const review = await Review.create({
        productId: product.id, // Ensure productId is linked
        userId: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      });

      // Recalculate product rating and numReviews
      const reviews = await Review.findAll({ where: { productId: product.id } });
      product.numReviews = reviews.length;
      product.rating =
        reviews.reduce((acc, r) => r.rating + acc, 0) / reviews.length;

      await product.save();

      res.status(201).json({ message: 'Review added', review });
    } catch (error) {
      console.error('Error creating review:', error.message);
      res.status(500).json({ message: 'Failed to create review', error: error.message });
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['rating', 'DESC']],
      limit: 3,
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching top products:', error.message);
    res.status(500).json({ message: 'Server error fetching top products' });
  }
});