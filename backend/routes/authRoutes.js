const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/reset-password', authController.resetPassword);
router.post('/recover-password', authController.recoverPassword);
router.get('/providers', authController.getProviders);
router.get('/test', (req, res) => res.json({ message: 'Auth API is working' }));

module.exports = router;
