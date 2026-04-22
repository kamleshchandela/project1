const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  googleId: { type: String },
  avatar: { type: String },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'provider'], 
    default: 'user' 
  },
  preferences: {
    budgetMin: Number,
    budgetMax: Number,
    preferredCities: [String],
    homeTypes: [String],
    familySize: String,
    lifestyle: String,
    notificationsEnabled: { type: Boolean, default: true }
  },
  savedHomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Home' }],
  viewedHomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Home' }],
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
