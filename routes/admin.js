const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Register a new admin
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Admin already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashed, name });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    // For demo: return a simple token (in production use JWT)
    res.json({ token: 'admin-token', name: admin.name || '', email: admin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 