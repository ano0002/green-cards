const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const connectDB = require('../../config/database');

// Connect to database when routes are initialized
connectDB();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.logout);

module.exports = router;