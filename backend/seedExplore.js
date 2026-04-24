const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

// Load env vars
dotenv.config();

const DB = process.env.DATABASE || 'mongodb://127.0.0.1:27017/hometruth';

const mockHomes = [
  {
    title: 'Modern Luxury Apartment',
    address: 'Satellite, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    propertyType: 'Apartment',
    listingType: 'rent',
    price: 28000,
    healthScore: 85,
    riskLevel: 'low',
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'],
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    ownerName: 'HomeTruth Test',
    phone: '1234567890',
    whatsapp: '1234567890',
    status: 'approved'
  },
  {
    title: 'Premium Villa',
    address: 'Bodakdev, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    propertyType: 'Villa',
    listingType: 'rent',
    price: 75000,
    healthScore: 92,
    riskLevel: 'low',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'],
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    ownerName: 'HomeTruth Test',
    phone: '1234567890',
    whatsapp: '1234567890',
    status: 'approved'
  },
  {
    title: 'Cozy Independent House',
    address: 'Bopal, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    propertyType: 'House',
    listingType: 'rent',
    price: 22000,
    healthScore: 72,
    riskLevel: 'medium',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    ownerName: 'HomeTruth Test',
    phone: '1234567890',
    whatsapp: '1234567890',
    status: 'approved'
  },
  {
    title: 'Smart Tech Studio',
    address: 'Kalwa Chowk, Junagadh',
    city: 'Junagadh',
    state: 'Gujarat',
    propertyType: 'Apartment',
    listingType: 'rent',
    price: 10000,
    healthScore: 88,
    riskLevel: 'low',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    ownerName: 'HomeTruth Test',
    phone: '1234567890',
    whatsapp: '1234567890',
    status: 'approved'
  }
];

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // Optional: await Property.deleteMany({ ownerName: 'HomeTruth Test' });
    await Property.create(mockHomes);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

importData();
