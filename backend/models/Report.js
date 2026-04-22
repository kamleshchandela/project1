const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true },
  reportType: {
    type: String,
    enum: ['free', 'premium'],
    required: true
  },
  pdfUrl: String,
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
