const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/', async (req, res) => {
  try {
    const { adminEmail } = req.body;
    if (!adminEmail) return res.status(400).json({ error: 'adminEmail required' });
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders (for admin or testing)
router.get('/', async (req, res) => {
  try {
    const { adminEmail } = req.query;
    if (!adminEmail) return res.status(400).json({ error: 'adminEmail required' });
    const orders = await Order.find({ adminEmail }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status or other fields
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 