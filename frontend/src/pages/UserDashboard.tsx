import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Clock, Settings, Bell, CreditCard, ShieldCheck } from 'lucide-react';

const UserDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 space-y-2">
          {[
            { label: 'Overview', icon: <Home size={18} />, active: true },
            { label: 'Saved Homes', icon: <Heart size={18} /> },
            { label: 'My Bookings', icon: <Clock size={18} /> },
            { label: 'Loan Status', icon: <CreditCard size={18} /> },
            { label: 'Benefits Tracker', icon: <ShieldCheck size={18} /> },
            { label: 'Notifications', icon: <Bell size={18} /> },
            { label: 'Settings', icon: <Settings size={18} /> },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-amber-primary text-dark-bg font-bold' : 'hover:bg-white/5 text-gray-400'
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Good morning, Rajesh</h1>
              <p className="text-gray-400">Here's what's happening with your home search.</p>
            </div>
            <img src="https://via.placeholder.com/48" className="w-12 h-12 rounded-full border-2 border-amber-primary" alt="profile" />
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500 uppercase font-bold mb-2">Saved Homes</p>
              <h3 className="text-4xl font-mono font-bold">12</h3>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500 uppercase font-bold mb-2">Service Bookings</p>
              <h3 className="text-4xl font-mono font-bold">03</h3>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm text-gray-500 uppercase font-bold mb-2">Benefits Unlocked</p>
              <h3 className="text-4xl font-mono font-bold text-success">₹2.6L</h3>
            </div>
          </div>

          {/* Recent Activity / Saved Homes Teaser */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recently Saved</h3>
              <button className="text-amber-primary text-sm font-bold">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Luxury Apartment in Indiranagar</h4>
                    <p className="text-xs text-gray-500 mb-2">Bangalore</p>
                    <p className="text-amber-primary font-mono font-bold">₹45,000/mo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Tracker */}
          <div className="glass-card p-6 border-t-4 border-amber-primary">
            <h3 className="text-xl font-bold mb-4">Loan Application Status</h3>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-amber-primary/20 p-3 rounded-full text-amber-primary">
                  <Home size={24} />
                </div>
                <div>
                  <h4 className="font-bold">HDFC Home Loan</h4>
                  <p className="text-xs text-gray-500">Application ID: #HT-99210</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-[10px] font-bold uppercase">Under Review</span>
                <p className="text-xs text-gray-500 mt-1">Est. Approval: 2 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
