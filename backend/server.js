import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import cors from 'cors';
import express from 'express';
import sequelize  from './config/db.js';

import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
 import paymentRoutes from './routes/paymentRoutes.js';
import Payment from './models/Payment.js';

import { Product, Review, defineAssociations } from './models/productModel.js';


// Define associations
defineAssociations();
Payment(sequelize, sequelize.constructor);
// Synchronize models with the database
await sequelize.sync({ alter: true });
console.log('Database synchronized'.green.bold);

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json()); // Accept JSON payloads

// Routes
 app.use('/api', paymentRoutes); // endpoint: /api/make-payment
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Static folder for uploaded files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
  }
);
