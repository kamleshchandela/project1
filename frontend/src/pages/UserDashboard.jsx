import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Clock, Settings, Bell, CreditCard, ShieldCheck, User, MapPin, Phone, Mail, TrendingUp, Briefcase, Star, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('Overview');
  const { user } = useSelector((state) => state.auth);

  // Dynamic Sidebar based on Role
  const sidebarLinks = user?.role === 'provider' ? [
    { label: 'Overview', icon: <Home size={18} /> },
    { label: 'My Services', icon: <Briefcase size={18} /> },
    { label: 'Earnings', icon: <TrendingUp size={18} /> },
    { label: 'Client Reviews', icon: <Star size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> },
  ] : [
    { label: 'Overview', icon: <Home size={18} /> },
    { label: 'Saved Homes', icon: <Heart size={18} /> },
    { label: 'My Bookings', icon: <Clock size={18} /> },
    { label: 'Loan Status', icon: <CreditCard size={18} /> },
    { label: 'Benefits Tracker', icon: <ShieldCheck size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> },
  ];

  // Dummy Data for Providers
  const dummyServices = [
    { id: 1, title: 'Deep Cleaning & Sanitization', status: 'Active', price: '₹2,499', jobs: 42, rating: 4.8 },
    { id: 2, title: 'Electrical Maintenance', status: 'Active', price: '₹899', jobs: 128, rating: 4.9 },
    { id: 3, title: 'Plumbing Emergency Services', status: 'Pending Approval', price: '₹599', jobs: 0, rating: 0 },
  ];

  const dummyEarnings = {
    total: '₹1,24,500',
    thisMonth: '₹18,200',
    pending: '₹4,500',
    history: [
      { id: 1, date: '2024-03-22', client: 'Aman Sharma', service: 'Electrical', amount: '₹899', status: 'Completed' },
      { id: 2, date: '2024-03-20', client: 'Priya Patel', service: 'Deep Cleaning', amount: '₹2,499', status: 'Completed' },
      { id: 3, date: '2024-03-18', client: 'Rahul V.', service: 'Electrical', amount: '₹899', status: 'Completed' },
    ]
  };

  const dummyReviews = [
    { id: 1, user: 'Siddharth M.', rating: 5, text: 'Excellent service! Very professional and arrived on time.', date: '2 days ago' },
    { id: 2, user: 'Neha Gupta', rating: 4, text: 'Great work on the plumbing, but took a bit longer than expected.', date: '1 week ago' },
    { id: 3, user: 'Vikram Singh', rating: 5, text: 'The deep cleaning was top-notch. Highly recommended!', date: '2 weeks ago' },
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
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium text-sm
                  ${activeTab === item.label 
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

          {/* Content based on Active Tab */}
          {activeTab === 'Overview' && (
            <>
              {user?.role === 'provider' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-3xl border-t-4 border-amber-primary">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Total Earnings</p>
                      <h3 className="text-4xl font-mono font-bold text-white">{dummyEarnings.total}</h3>
                    </div>
                    <div className="glass-card p-8 rounded-3xl">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Active Jobs</p>
                      <h3 className="text-4xl font-mono font-bold text-white">4</h3>
                    </div>
                    <div className="glass-card p-8 rounded-3xl">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Profile Rating</p>
                      <h3 className="text-4xl font-mono font-bold text-amber-primary">4.9/5</h3>
                    </div>
                  </div>

                  <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-premium">
                    <h3 className="text-2xl font-serif font-bold mb-8">Recent Activity</h3>
                    <div className="space-y-4">
                      {dummyEarnings.history.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-primary/10 flex items-center justify-center text-amber-primary font-bold">{tx.client[0]}</div>
                            <div>
                              <p className="text-sm font-bold text-white">{tx.client}</p>
                              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{tx.service}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-success">+{tx.amount}</p>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{tx.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Heart size={48} /></div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Saved Properties</p>
                      <h3 className="text-5xl font-mono font-bold mb-1 text-white">0</h3>
                      <p className="text-xs text-amber-primary font-medium">Start exploring homes</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Clock size={48} /></div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Active Bookings</p>
                      <h3 className="text-5xl font-mono font-bold mb-1 text-white">0</h3>
                      <p className="text-xs text-white/30 font-medium">No scheduled visits</p>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldCheck size={48} /></div>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">Benefits Unlocked</p>
                      <h3 className="text-5xl font-mono font-bold text-success mb-1">₹0</h3>
                      <p className="text-xs text-success/70 font-medium">Claim your welcome bonus</p>
                    </div>
                  </div>

                  <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 shadow-premium text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-amber-primary mx-auto mb-6"><Home size={32} /></div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Your search begins here</h3>
                    <p className="text-white/40 text-lg max-w-sm mx-auto mb-10">You haven't saved any properties yet. Explore the best homes in {user?.location || 'your city'}.</p>
                    <button className="btn-amber px-12 py-4 text-lg font-bold shadow-amber-glow">Start Exploring</button>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'My Services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold">Manage Services</h3>
                <button className="btn-amber px-6 py-2.5 text-xs font-bold shadow-amber-glow flex items-center gap-2">
                  Add New Service <Briefcase size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyServices.map((service) => (
                  <div key={service.id} className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-amber-primary/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${service.status === 'Active' ? 'bg-success/10 text-success border border-success/20' : 'bg-amber-primary/10 text-amber-primary border border-amber-primary/20'}`}>
                        {service.status}
                      </span>
                      <button className="text-white/20 hover:text-white transition-colors"><Settings size={16} /></button>
                    </div>
                    <h4 className="text-xl font-bold mb-6 h-12 line-clamp-2">{service.title}</h4>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Price</p>
                        <p className="text-lg font-mono font-bold text-white">{service.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Jobs</p>
                        <p className="text-lg font-mono font-bold text-white">{service.jobs}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Earnings' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-8 rounded-3xl border-white/5 bg-amber-primary/5">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Available Balance</p>
                  <h3 className="text-4xl font-mono font-bold text-white">{dummyEarnings.total}</h3>
                  <button className="mt-6 w-full py-3 bg-amber-primary text-dark-bg text-xs font-black uppercase tracking-[0.2em] rounded-xl font-bold shadow-amber-glow">Withdraw Funds</button>
                </div>
                <div className="glass-panel p-8 rounded-3xl border-white/5">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Earnings (March)</p>
                  <h3 className="text-4xl font-mono font-bold text-white">{dummyEarnings.thisMonth}</h3>
                  <p className="text-xs text-success mt-2 font-bold">+12% from last month</p>
                </div>
                <div className="glass-panel p-8 rounded-3xl border-white/5">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Pending Payout</p>
                  <h3 className="text-4xl font-mono font-bold text-white">{dummyEarnings.pending}</h3>
                  <p className="text-xs text-white/20 mt-2">Next payout: April 1st</p>
                </div>
              </div>
              <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
                <h3 className="text-2xl font-serif font-bold mb-8">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-white/30 text-[10px] font-black uppercase tracking-widest">
                        <th className="pb-6">Date</th>
                        <th className="pb-6">Client</th>
                        <th className="pb-6">Service</th>
                        <th className="pb-6">Amount</th>
                        <th className="pb-6 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {dummyEarnings.history.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/[0.02] last:border-0">
                          <td className="py-6 text-white/60">{tx.date}</td>
                          <td className="py-6 font-bold">{tx.client}</td>
                          <td className="py-6"><span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/40">{tx.service}</span></td>
                          <td className="py-6 font-mono font-bold text-success">{tx.amount}</td>
                          <td className="py-6 text-right"><span className="px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">{tx.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Client Reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-4xl font-serif font-bold mb-2 text-gradient">Feedback Loop</h3>
                  <p className="text-white/40">You have <span className="text-white font-bold">24 client reviews</span> with a 4.9 average.</p>
                </div>
                <div className="flex items-center gap-2 p-3 glass-panel rounded-2xl">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= 4 ? "#F2C36B" : "transparent"} stroke={s <= 4 ? "#F2C36B" : "#ffffff40"} />)}
                  <span className="ml-2 font-bold text-amber-primary">4.9</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dummyReviews.map((review) => (
                  <div key={review.id} className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= review.rating ? "#F2C36B" : "transparent"} stroke={s <= review.rating ? "#F2C36B" : "#ffffff40"} />)}
                      </div>
                      <span className="text-[10px] text-white/20 font-bold italic">{review.date}</span>
                    </div>
                    <p className="text-white/70 italic mb-8 flex-1 leading-relaxed">"{review.text}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-amber-primary">{review.user[0]}</div>
                      <p className="text-sm font-bold text-white">{review.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-3xl space-y-10">
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><User size={20} className="text-amber-primary" /> Profile Preferences</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 uppercase font-black tracking-widest ml-4">Full Name</label>
                    <input type="text" defaultValue={user?.fullName} className="w-full px-6 py-4 rounded-2xl glass-panel border-white/10 bg-white/5 text-sm font-bold focus:border-amber-primary/40 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 uppercase font-black tracking-widest ml-4">Location</label>
                    <input type="text" defaultValue={user?.location || 'Add location'} className="w-full px-6 py-4 rounded-2xl glass-panel border-white/10 bg-white/5 text-sm font-bold focus:border-amber-primary/40 outline-none transition-all" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Bell size={20} className="text-amber-primary" /> Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Job Booking Alerts', desc: 'Get notified immediately when a client books your service.' },
                    { label: 'Payment Notifications', desc: 'Receive alerts when payouts are processed or pending.' },
                    { label: 'Marketing Communications', desc: 'Occasional updates about platform features and tips.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-6 glass-panel rounded-2xl border-white/5">
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-xs text-white/30 mt-1">{item.desc}</p>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-amber-primary p-1 flex justify-end shadow-amber-glow cursor-pointer"><div className="w-4 h-4 rounded-full bg-dark-bg"></div></div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-6">
                <button className="btn-amber px-10 py-4 font-bold shadow-amber-glow-strong">Save All Changes</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
