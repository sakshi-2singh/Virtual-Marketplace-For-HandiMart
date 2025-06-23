// controllers/paymentController.js
import Payment from '../models/Payment.js';

export const makePayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, paymentStatus, transactionId } = req.body;
console.log("req.body",req.body)
    if (!userId || !amount || !paymentMethod || !paymentStatus) {
      return res.status(400).json({ message: 'Missing required payment details' });
    }

    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPayment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
      paidAt: new Date(),
    });

    res.status(201).json({
      message: 'Payment recorded successfully',
      payment: newPayment,
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
