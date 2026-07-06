import Order from '../models/orderModel.js';
import crypto from 'crypto';
import Razorpay from 'razorpay';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create Razorpay Order
// @route   POST /api/orders/:id/razorpay
// @access  Private
const createRazorpayOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Create Razorpay instance here to avoid initialization on start if keys are missing
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'dummy',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy',
      });

      const options = {
        amount: Math.round(order.totalPrice * 100), // amount in smallest currency unit (paise)
        currency: 'INR',
        receipt: `receipt_order_${order._id}`,
      };

      if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID' || !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET === 'YOUR_RAZORPAY_KEY_SECRET') {
        res.status(500);
        throw new Error('Razorpay keys are not configured in backend');
      }

      const razorpayOrder = await instance.orders.create(options);
      
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      res.json(razorpayOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {


      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'paid',
          update_time: Date.now().toString(),
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400);
        throw new Error('Invalid Payment Signature');
      }
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export {
  addOrderItems,
  getOrderById,
  createRazorpayOrder,
  updateOrderToPaid,
  getMyOrders,
};
