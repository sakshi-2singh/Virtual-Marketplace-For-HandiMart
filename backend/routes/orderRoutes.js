// import express from 'express'
// const router = express.Router()
// import {
//   addOrderItems,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getMyOrders,
//   getOrders,
// } from '../controllers/orderController.js'
// import {
//   protect,
//   admin,
//   admin_or_seller,
// } from '../middleware/authMiddleware.js'

// router
//   .route('/')
//   .post(protect, addOrderItems)  // Add Order (Protected Route)
//   .get(protect, admin_or_seller, getOrders)  // Get all orders (Admin/Seller Route)

// router.route('/myorders').get(protect, getMyOrders)  // Get orders for the current user
// router.route('/:id').get(protect, getOrderById)  // Get specific order by ID
// router.route('/:id/pay').put(protect, updateOrderToPaid)  // Update order status to Paid
// router
//   .route('/:id/deliver')
//   .put(protect, admin_or_seller, updateOrderToDelivered)  // Update order status to Delivered

// export default router
import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import {
  protect,
  admin,
  admin_or_seller,
} from '../middleware/authMiddleware.js';

// Routes for creating and managing orders
router
  .route('/')
  .post(protect, addOrderItems)  // Add an order (Only authenticated users can add orders)
  .get(protect, admin_or_seller, getOrders);  // Get all orders (Accessible by Admin and Admin Sellers)

router
  .route('/myorders')
  .get(protect, getMyOrders);  // Get orders for the currently logged-in user (Authenticated users only)

router
  .route('/:id')
  .get(protect, getOrderById);  // Get a specific order by its ID (Authenticated users only)

router
  .route('/:id/pay')
  .put(protect, updateOrderToPaid);  // Update order status to 'Paid' (Authenticated users only)

router
  .route('/:id/deliver')
  .put(protect, admin_or_seller, updateOrderToDelivered);  // Update order status to 'Delivered' (Admin or Admin Seller only)

export default router;
