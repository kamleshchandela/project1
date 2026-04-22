const mongoose = require('mongoose');

const governmentSchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['central', 'state', 'tax', 'special'],
    required: true
  },
  state: String,
  benefitAmount: String,
  benefitType: {
    type: String,
    enum: ['subsidy', 'tax_deduction', 'direct_benefit']
  },
  eligibility: {
    minIncome: Number,
    maxIncome: Number,
    firstTimeBuyer: Boolean,
    category: { type: String, enum: ['EWS', 'LIG', 'MIG', 'general'] }
  },
  deadline: Date,
  documents: [String],
  applicationLink: String,
  status: {
    type: String,
    enum: ['active', 'expired', 'coming_soon'],
    default: 'active'
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('GovernmentScheme', governmentSchemeSchema);
