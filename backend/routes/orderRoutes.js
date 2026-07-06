import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  createRazorpayOrder,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/razorpay').post(protect, createRazorpayOrder);
router.route('/:id/pay').post(protect, updateOrderToPaid);

export default router;
