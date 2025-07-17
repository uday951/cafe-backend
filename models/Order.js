const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  tableId: { type: String, default: null },
  status: { type: String, default: 'pending' },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: Number,
  isOnlineOrder: { type: Boolean, default: false },
  customerNotes: String,
  payment: {
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
    paymentStatus: String,
  },
  createdAt: { type: Date, default: Date.now },
  adminEmail: { type: String, required: true },
});

module.exports = mongoose.model('Order', OrderSchema); 