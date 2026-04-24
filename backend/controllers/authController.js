const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const sendEmail = require('../utils/email');
const cloudinary = require('../utils/cloudinary');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, location, intent, password, role, avatar, serviceCategory, experience, jobsCompleted, baseFee } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let avatarUrl = '';
    if (avatar) {
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        folder: 'hometruth/users',
      });
      avatarUrl = uploadResponse.secure_url;
    }

    const user = await User.create({
      fullName,
      email,
      phone,
      location,
      intent: ['Buy', 'Rent', 'Invest', 'none'].includes(intent) ? intent : 'none',
      password,
      role: role || 'user',
      avatar: avatarUrl,
      serviceCategory: role === 'provider' ? serviceCategory : undefined,
      experience: role === 'provider' ? (Number(experience) || 0) : undefined,
      jobsCompleted: role === 'provider' ? (Number(jobsCompleted) || 0) : undefined,
      baseFee: role === 'provider' ? (Number(baseFee) || 0) : undefined
    });

    const token = signToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    console.error('REGISTRATION ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    console.log('DEBUG: User found:', !!user, 'Password selected:', !!user?.password);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Create user if doesn't exist
      user = await User.create({
        fullName: name,
        email: email,
        googleId: sub,
        avatar: picture,
        password: crypto.randomBytes(16).toString('hex'), // Random pass for google users
      });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    console.error('GOOGLE LOGIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your Password Reset OTP (Valid for 10 min)',
        message: `Your OTP is ${otp}`,
        html: `<div style="padding: 20px; font-family: sans-serif;">
          <h2>Reset Your Password</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="color: #F2C36B; font-size: 40px; letter-spacing: 5px;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>`,
      });

      res.status(200).json({ status: 'success', message: 'OTP sent to email' });
    } catch (err) {
      user.resetOTP = undefined;
      user.resetOTPExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Error sending email. Try again later.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ 
      email, 
      resetOTP: otp,
      resetOTPExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ status: 'success', message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ 
      email, 
      resetOTP: otp,
      resetOTPExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = password;
    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;
    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Generate a random temporary password (8 characters)
    const tempPassword = Math.random().toString(36).slice(-8);
    
    // Update user's password
    user.password = tempPassword;
    await user.save();

    // Return the plain text password to the frontend
    // This allows the frontend to send it via EmailJS
    res.status(200).json({ 
      status: 'success', 
      message: 'New password generated',
      data: { 
        tempPassword,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || 'Not provided'
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' });
    console.log('DEBUG: Found real providers in DB:', providers.length);
    
    res.status(200).json({
      status: 'success',
      results: providers.length,
      data: { providers },
    });
  } catch (err) {
    console.error('getProviders Error:', err);
    res.status(500).json({ error: err.message });
  }
};
