const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  serviceType: { type: String, required: true },
  description: String,
  photos: [String],
  dateTime: { type: Date, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed'],
    default: 'pending'
  },
  price: Number,
  platformCommission: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card']
  },
  tracking: {
    providerLocation: { lat: Number, lng: Number },
    estimatedArrival: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
