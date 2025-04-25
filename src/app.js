require('dotenv').config();
const connectDB = require('../config/database');
const express = require('express');

const app = express();

// Connect to Database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});