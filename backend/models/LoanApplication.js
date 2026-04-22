const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Home' },
  bankName: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // in years
  interestRate: { type: Number, required: true },
  monthlyEmi: { type: Number, required: true },
  status: {
    type: String,
    enum: ['initiated', 'applied', 'approved', 'rejected'],
    default: 'initiated'
  }
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
