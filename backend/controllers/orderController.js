import asyncHandler from 'express-async-handler';
import defineOrderModel from '../models/orderModel.js';
import OrderItem from '../models/orderItem.js';
import User from '../models/userModel.js';
import { Product } from '../models/productModel.js';
import sequelize from '../config/db.js'; // ✅ make sure this is imported
import { DataTypes } from 'sequelize';    // ✅ make sure this is imported

const OrderEntity = defineOrderModel(sequelize, DataTypes);
const models = { Order: OrderEntity, OrderItem, User, Product };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models); // Initialize associations
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Create the order
  const order = await OrderEntity.create({
    userId: req.user.id,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
  });

  // Map order items
  const items = orderItems.map((item) => ({
    orderId: order.id,
    productId: item.product,
    name: item.name,
    qty: item.qty,
    price: item.price,
    image: item.image,
    userId: req.user.id, // Ensure userId is correctly mapped
  }));

  try {
    // Bulk insert order items
    await OrderItem.bulkCreate(items);
  } catch (error) {
    console.error("Error creating order items:", error);
    res.status(500).json({ message: 'Error creating order items', error });
    return; // Exit the function after sending the response
  }

  // Fetch the full order with items
  const fullOrder = await OrderEntity.findOne({
    where: { id: order.id },
    include: [
      { model: OrderItem, as: 'orderItems' },
    ],
  });

  res.status(201).json(fullOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderEntity.findOne({
    where: { id: req.params.id },
    include: [
      { model: User, as: 'user', attributes: ['name', 'email'] },
      {
        model: OrderItem,
        as: 'orderItems',
        include: [{ model: Product, as: 'product' }],
      },
    ],
  });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderEntity.findByPk(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await OrderEntity.findByPk(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderEntity.findAll({
    where: { userId: req.user.id },
    include: [{ model: OrderItem, as: 'orderItems' }],
    order: [['createdAt', 'DESC']],
  });

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderEntity.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      { model: OrderItem, as: 'orderItems',  
        include: [{ model: Product, as: 'product' }],
    },
    ],
    order: [['createdAt', 'DESC']],

  });

  if (req.user.isSeller) {
    const sellerOrders = orders.filter(order =>
      order.orderItems.some(item => item.userId === req.user.id)
    );
    return res.json(sellerOrders);
  }

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
