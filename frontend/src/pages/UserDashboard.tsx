import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Clock, Settings, Bell, CreditCard, ShieldCheck, User, MapPin, Phone, Mail, TrendingUp, Briefcase, Star, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const UserDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Dynamic Sidebar based on Role
  const sidebarLinks = user?.role === 'provider' ? [
    { label: 'Overview', icon: <Home size={18} />, active: true },
    { label: 'My Services', icon: <Briefcase size={18} /> },
    { label: 'Earnings', icon: <TrendingUp size={18} /> },
    { label: 'Client Reviews', icon: <Star size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> },
  ] : [
    { label: 'Overview', icon: <Home size={18} />, active: true },
    { label: 'Saved Homes', icon: <Heart size={18} /> },
    { label: 'My Bookings', icon: <Clock size={18} /> },
    { label: 'Loan Status', icon: <CreditCard size={18} /> },
    { label: 'Benefits Tracker', icon: <ShieldCheck size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> },
  ];

  const getIntentText = () => {
    switch(user?.intent) {
      case 'Buy': return 'Ready to find your dream home.';
      case 'Rent': return 'Looking for the perfect rental space.';
      case 'Invest': return 'Exploring high-ROI property investments.';
      default: return 'Exploring the real estate market.';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 selection:bg-amber-primary/30">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-72 space-y-3">
          <div className="glass-panel p-6 rounded-3xl border-white/5 mb-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-2 border-amber-primary/40 overflow-hidden mb-4 shadow-amber-glow relative group">
               {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-primary/10">
                  <User size={40} className="text-amber-primary" />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user?.fullName || 'User'}</h2>
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-amber-primary">
              {user?.role === 'provider' ? 'Partner Account' : 'Resident Account'}
            </span>
          </div>

          <div className="glass-panel p-4 rounded-3xl border-white/5">
            {sidebarLinks.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium text-sm
                  ${item.active 
                    ? 'bg-amber-primary text-dark-bg font-bold shadow-amber-glow' 
                    : 'hover:bg-white/5 text-white/50 hover:text-white'
                  }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header & Profile Details */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10 gap-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-serif font-bold mb-2"
                >
                  Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, <span className="text-gradient">{user?.fullName?.split(' ')[0] || 'there'}</span>
                </motion.h1>
                <p className="text-white/40 text-lg">
                  {user?.role === 'provider' ? 'Manage your services and track your earnings.' : getIntentText()}
                </p>
              </div>
              
              <button className="flex items-center gap-2 text-xs font-bold text-amber-primary hover:text-amber-primary/80 transition-colors">
                Edit Profile <ChevronRight size={14} />
              </button>
            </header>

            {/* User Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-primary"><Mail size={16} /></div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Email</p>
                  <p className="text-sm font-medium text-white/80">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-primary"><Phone size={16} /></div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Phone</p>
                  <p className="text-sm font-medium text-white/80">{user?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-primary"><MapPin size={16} /></div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Location</p>
                  <p className="text-sm font-medium text-white/80">{user?.location || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Content based on Role */}
          {user?.role === 'provider' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-3xl border-t-4 border-amber-primary">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Total Earnings</p>
                <h3 className="text-4xl font-mono font-bold">₹0</h3>
              </div>
              <div className="glass-card p-8 rounded-3xl">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Active Jobs</p>
                <h3 className="text-4xl font-mono font-bold">0</h3>
              </div>
              <div className="glass-card p-8 rounded-3xl">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Profile Rating</p>
                <h3 className="text-4xl font-mono font-bold text-amber-primary">NEW</h3>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Grid for Users */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Heart size={48} /></div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Saved Properties</p>
                  <h3 className="text-5xl font-mono font-bold mb-1">0</h3>
                  <p className="text-xs text-amber-primary font-medium">Start exploring homes</p>
                </div>
                <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Clock size={48} /></div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Active Bookings</p>
                  <h3 className="text-5xl font-mono font-bold mb-1">0</h3>
                  <p className="text-xs text-white/30 font-medium">No scheduled visits</p>
                </div>
                <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldCheck size={48} /></div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Benefits Unlocked</p>
                  <h3 className="text-5xl font-mono font-bold text-success mb-1">₹0</h3>
                  <p className="text-xs text-success/70 font-medium">Claim your welcome bonus</p>
                </div>
              </div>

              {/* Discovery / Action Section based on Intent */}
              <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-premium">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-serif font-bold">
                    {user?.intent === 'Rent' ? 'Recommended Rentals' : user?.intent === 'Buy' ? 'Top Properties for Sale' : 'Featured Investments'}
                  </h3>
                  <button className="text-amber-primary text-xs font-black uppercase tracking-widest hover:text-amber-secondary transition-colors">Explore Market</button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                  <div className="w-16 h-16 rounded-full bg-amber-primary/10 flex items-center justify-center text-amber-primary mb-4">
                    <Home size={24} />
                  </div>
                  <h4 className="text-lg font-bold mb-2">No properties saved yet</h4>
                  <p className="text-white/40 text-sm max-w-sm mb-6">Head over to the Explore section to find properties matching your criteria in {user?.location || 'your area'}.</p>
                  <button className="btn-amber px-8 py-3 text-sm font-bold shadow-amber-glow">Browse {user?.intent || 'Properties'}</button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

