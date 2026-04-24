const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['Apartment', 'House', 'Villa', 'PG', 'Commercial']
  },
  listingType: {
    type: String,
    required: [true, 'Listing type is required'],
    enum: ['buy', 'rent']
  },
  address: {
    type: String,
    required: [true, 'Full address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  area: {
    type: Number,
    required: [true, 'Area in sq ft is required']
  },
  furnishing: {
    type: String,
    enum: ['Unfurnished', 'Semi', 'Fully'],
    default: 'Unfurnished'
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp number is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length >= 3 && v.length <= 10;
      },
      message: 'Property must have between 3 and 10 images'
    }
  },
  healthScore: {
    type: Number,
    min: 0,
    max: 100
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'sold', 'rented'],
    default: 'pending'
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  nearbyPlaces: {
    hospitals: [{
      name: { type: String },
      distance: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    }],
    gardens: [{
      name: { type: String },
      distance: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    }],
    temples: [{
      name: { type: String },
      distance: { type: String },
      lat: { type: Number },
      lng: { type: Number }
    }]
  }
}, {
  timestamps: true,
  strict: false
});

module.exports = mongoose.model('Property', propertySchema);
