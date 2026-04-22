import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ShieldCheck, Clock, Phone, AlertCircle } from 'lucide-react';

const categories = [
  { name: 'Plumber', icon: '🪠' },
  { name: 'Electrician', icon: '⚡' },
  { name: 'AC Repair', icon: '❄️' },
  { name: 'Carpenter', icon: '🪚' },
  { name: 'Painter', icon: '🎨' },
  { name: 'Cleaning', icon: '🧹' },
  { name: 'Pest Control', icon: '🐜' },
  { name: 'Home Inspector', icon: '🔍' },
];

const mockProviders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    service: 'Plumber',
    experience: 8,
    reliabilityScore: 95,
    jobsCompleted: 1240,
    responseTime: '15 mins',
    priceRange: '₹300 - ₹1500',
    status: 'available',
    rating: 4.8,
    reviews: 320,
    avatar: 'https://via.placeholder.com/64'
  },
  {
    id: '2',
    name: 'Amit Singh',
    service: 'Electrician',
    experience: 5,
    reliabilityScore: 88,
    jobsCompleted: 850,
    responseTime: '30 mins',
    priceRange: '₹200 - ₹2000',
    status: 'busy',
    rating: 4.6,
    reviews: 150,
    avatar: 'https://via.placeholder.com/64'
  },
];

const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Plumber');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Emergency Section */}
      <section className="mb-12">
        <div className="bg-critical/10 border border-critical/20 rounded-card-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-critical p-4 rounded-full text-white animate-pulse">
              <AlertCircle size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-critical">Emergency - Need Help Now?</h3>
              <p className="text-gray-400">Get a verified professional at your doorstep within 60 minutes.</p>
            </div>
          </div>
          <button className="bg-critical hover:bg-critical/80 text-white px-10 py-4 rounded-btn font-bold text-lg transition-all shadow-lg shadow-critical/20">
            Request Quick Help
          </button>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Service Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 rounded-card-sm transition-all border ${
                activeCategory === cat.name 
                ? 'glass-card border-amber-primary bg-amber-primary/10' 
                : 'glass-card border-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-4xl mb-2">{cat.icon}</span>
              <span className={`text-sm font-medium ${activeCategory === cat.name ? 'text-amber-primary' : 'text-gray-400'}`}>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Providers List */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Verified {activeCategory}s Near You</h2>
          <div className="flex gap-4">
            <select className="bg-transparent border border-white/10 rounded-lg px-4 py-2 text-sm outline-none">
              <option>Highest Rated</option>
              <option>Most Reliable</option>
              <option>Quickest Response</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProviders.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <img src={provider.avatar} alt={provider.name} className="w-16 h-16 rounded-full border-2 border-amber-primary" />
                  <div>
                    <h3 className="text-xl font-bold">{provider.name}</h3>
                    <p className="text-sm text-gray-500">{provider.experience} Years Experience</p>
                    <div className="flex items-center gap-1 text-amber-primary mt-1">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">{provider.rating}</span>
                      <span className="text-xs text-gray-500">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  provider.status === 'available' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {provider.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Reliability</p>
                  <p className="text-lg font-mono font-bold text-success">{provider.reliabilityScore}%</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Response</p>
                  <p className="text-lg font-mono font-bold text-blue-400">{provider.responseTime}</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-1"><ShieldCheck size={14} /> Jobs Completed</span>
                  <span className="font-bold">{provider.jobsCompleted}+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-1"><Clock size={14} /> Price Range</span>
                  <span className="font-bold">{provider.priceRange}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 btn-glass text-sm">View Profile</button>
                <button className="flex-1 btn-amber text-sm">Book Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
