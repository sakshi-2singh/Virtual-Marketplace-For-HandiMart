import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Middleware to protect routes (authenticated users only)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the 'Bearer <token>' format
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the ID from the decoded token
      const user = await User.findByPk(decoded.id);

      // If user not found, return an error
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      // Attach the user to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin-only access
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, allow access
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// Admin-seller-only access
const admin_seller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next(); // User is an admin seller, allow access
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin seller');
  }
};

// Admin or admin-seller access
const admin_or_seller = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isSeller)) {
    next(); // User is an admin or an admin seller, allow access
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin or seller');
  }
};

export { protect, admin, admin_seller, admin_or_seller };
