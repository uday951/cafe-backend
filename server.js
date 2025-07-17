require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const tableRoutes = require('./routes/table');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/tables', tableRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 