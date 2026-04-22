const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: {
    type: String,
    enum: ['plumber', 'electrician', 'ac_repair', 'carpenter', 'painter', 'cleaner', 'pest_control', 'appliance_repair', 'home_inspector', 'interior_designer'],
    required: true
  },
  experience: Number,
  reliabilityScore: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
  responseTime: String,
  priceRange: {
    min: Number,
    max: Number
  },
  availability: {
    status: { type: String, enum: ['available', 'busy', 'offline'], default: 'offline' },
    nextAvailable: Date
  },
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  documents: [String],
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  earnings: { type: Number, default: 0 },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifsc: String
  }
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
