const mongoose = require('mongoose');
const TableSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  adminEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Table', TableSchema); 