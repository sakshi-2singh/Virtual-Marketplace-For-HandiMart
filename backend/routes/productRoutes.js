import express from 'express'
import upload from '../middleware/upload.js'

const router = express.Router()

import {
  getProducts,
  getSellerProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'

import {
  protect,
  admin,
  admin_or_seller,
} from '../middleware/authMiddleware.js'
// Only apply upload middleware when updating with image later
router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    admin_or_seller,
    createProduct // Do NOT use upload middleware here
  )

// Update the route to include seller ID as a parameter
router.route('/seller/:id').get(protect, getSellerProducts);
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin_or_seller, deleteProduct)
  .put(
    protect,
    admin_or_seller,
    upload.single('image'), // Apply image upload here during update
    updateProduct
  )


export default router
