const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  adminEmail: { type: String, required: true },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema); 