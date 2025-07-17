const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items for an admin
router.get('/', async (req, res) => {
  const { adminEmail } = req.query;
  if (!adminEmail) return res.status(400).json({ error: 'adminEmail required' });
  const items = await MenuItem.find({ adminEmail });
  res.json(items);
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { adminEmail } = req.body;
  if (!adminEmail) return res.status(400).json({ error: 'adminEmail required' });
  const item = new MenuItem(req.body);
  await item.save();
  res.status(201).json(item);
});

// Edit a menu item
router.put('/:id', async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router; 