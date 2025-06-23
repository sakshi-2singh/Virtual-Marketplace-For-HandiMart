import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// ------------------------
// Public Routes
// ------------------------
router.post('/login', authUser);       // Login
router.post('/', registerUser);        // Register

// ------------------------
// Protected Routes (User)
// ------------------------
router
  .route('/profile')
  .get(protect, getUserProfile)        // Get logged-in user's profile
  .put(protect, updateUserProfile);    // Update logged-in user's profile

// ------------------------
// Admin Routes
// ------------------------
router
  .route('/')
  .get(protect, admin, getUsers);      // Get all users

router
  .route('/:id')
  .get(protect, admin, getUserById)    // Get user by ID
  .put(protect, admin, updateUser)     // Update user by ID
  .delete(protect, admin, deleteUser); // Delete user by ID

export default router;
