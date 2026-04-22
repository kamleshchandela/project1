const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  homeType: {
    type: String,
    enum: ['apartment', 'independent_house', 'villa', 'pg', 'commercial'],
    required: true
  },
  bedrooms: Number,
  bathrooms: Number,
  area: Number, // sq ft
  rent: { type: Number, required: true },
  securityDeposit: Number,
  availableFrom: Date,
  furnishing: {
    type: String,
    enum: ['unfurnished', 'semi', 'fully']
  },
  photos: [String],
  healthScore: { type: Number, min: 0, max: 100 },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  hiddenIssues: [{
    issue: String,
    severity: { type: String, enum: ['warning', 'critical'] },
    description: String
  }],
  trueCost: {
    rent: Number,
    maintenance: Number,
    utilities: Number,
    repairs: Number,
    societyCharges: Number,
    total: Number
  },
  areaInsights: {
    safetyScore: Number,
    waterReliability: Number,
    powerReliability: Number,
    noiseLevel: String,
    airQuality: Number,
    nearestHospital: String,
    nearestSchool: String,
    nearestMetro: String
  },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  views: { type: Number, default: 0 },
  saves: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
