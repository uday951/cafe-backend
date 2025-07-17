const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// Get all tables for an admin or by number
router.get('/', async (req, res) => {
  const { adminEmail, number } = req.query;
  if (number) {
    // Find by table number (as string or number)
    const tables = await Table.find({ number: Number(number) });
    return res.json(tables);
  }
  if (!adminEmail) return res.status(400).json({ error: 'adminEmail required' });
  const tables = await Table.find({ adminEmail });
  res.json(tables);
});

// Add a new table
router.post('/', async (req, res) => {
  const { number, adminEmail } = req.body;
  if (!number || !adminEmail) return res.status(400).json({ error: 'number and adminEmail required' });
  const table = new Table({ number, adminEmail });
  await table.save();
  res.status(201).json(table);
});

// Delete a table
router.delete('/:id', async (req, res) => {
  await Table.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router; 