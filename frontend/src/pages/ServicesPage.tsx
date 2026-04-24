import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ShieldCheck, Clock, Phone, AlertCircle, ArrowRight, Zap, Sparkles, Filter, Users, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const categories = [
  { name: 'All', icon: '🌟' },
  { name: 'Plumber', icon: '🪠' },
  { name: 'Electrician', icon: '⚡' },
  { name: 'AC Repair', icon: '❄️' },
  { name: 'Carpenter', icon: '🪚' },
  { name: 'Painter', icon: '🎨' },
  { name: 'Cleaning', icon: '🧹' },
  { name: 'Pest Control', icon: '🐜' },
  { name: 'Home Inspector', icon: '🔍' },
  { name: 'Legal', icon: '⚖️' },
];

interface Provider {
  id: string;
  name: string;
  service: string;
  experience: number;
  reliabilityScore: number;
  jobsCompleted: number;
  responseTime: string;
  priceRange: string;
  status: string;
  rating: number;
  reviews: number;
  avatar: string;
  location: string;
}

const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Highest Reliability');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/providers');
      console.log('DEBUG: Raw Providers from API:', response.data.data.providers);
      const apiProviders = response.data.data.providers || [];
      
      const mappedProviders = apiProviders.map((p: any) => ({
        id: p._id,
        name: p.fullName,
        service: (p.serviceCategory || 'General Pro').charAt(0).toUpperCase() + (p.serviceCategory || 'General Pro').slice(1),
        experience: p.experience || 0,
        reliabilityScore: p.reliabilityScore || Math.floor(Math.random() * 10) + 90,
        jobsCompleted: p.jobsCompleted || 0,
        responseTime: p.responseTime || '15-30 mins',
        priceRange: p.baseFee ? `₹${p.baseFee}+` : '₹300+',
        status: p.status || 'Available',
        rating: Number((p.rating || (4.5 + (Math.random() * 0.5))).toFixed(1)),
        reviews: p.reviews || (Math.floor(Math.random() * 100) + 10),
        avatar: p.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.fullName)}&background=random`,
        location: p.location || 'Junagadh',
        phone: p.phone || '9979265140'
      }));

      setProviders(mappedProviders);
    } catch (error) {
      console.error('Error fetching providers:', error);
      toast.error('Failed to load professionals');
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter(provider => {
    const matchesCategory = activeCategory === 'All' || 
                           provider.service.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortOptions = ['Highest Reliability', 'Response Speed', 'Most Experienced'];

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <ShieldCheck size={12} /> Trusted Professionals Network
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-8xl font-serif font-bold leading-tight mb-8"
            >
              Home <span className="text-gradient italic">Essentials.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-xl lg:text-2xl font-light max-w-2xl leading-relaxed"
            >
              Access a curated network of highly reliable home service professionals. Verified, rated, and ready to help.
            </motion.p>
          </div>

          {/* Emergency Alert Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-[2.5rem] border-critical/20 bg-critical/5 flex flex-col gap-6 w-full lg:w-96 shadow-[0_20px_50px_rgba(239,68,68,0.1)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
               <AlertCircle size={80} className="text-critical" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-critical">
                <div className="w-2 h-2 rounded-full bg-critical animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Emergency Priority</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Need Help Now?</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">Dispatch a verified pro to your door in under 60 minutes.</p>
              <button className="w-full bg-critical hover:bg-critical/80 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-critical/20 flex items-center justify-center gap-3">
                <Phone size={16} /> Request Quick Help
              </button>
            </div>
          </motion.div>
        </div>

        {/* Categories Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <Sparkles size={20} className="text-amber-primary" />
            <h2 className="text-2xl font-bold">Select Service Category</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
            {categories.map((cat, i) => {
              const count = cat.name === 'All' 
                ? providers.length 
                : providers.filter(p => p.service.toLowerCase().includes(cat.name.toLowerCase())).length;
              
              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex-shrink-0 w-48 p-8 rounded-[2.5rem] transition-all duration-500 flex flex-col items-center gap-6 border ${
                    activeCategory === cat.name 
                    ? 'glass-panel border-amber-primary/50 bg-amber-primary/10 shadow-amber-glow-strong' 
                    : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl transition-transform duration-500 ${activeCategory === cat.name ? 'scale-110' : ''}`}>
                    {cat.icon}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold mb-1 ${activeCategory === cat.name ? 'text-amber-primary' : 'text-white/60'}`}>{cat.name}</p>
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">{count} Pros</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Providers Section with Search */}
        <section>
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
            <div className="flex-1 w-full max-w-2xl">
              <div className="flex flex-col md:flex-row md:items-end gap-8 mb-10">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                    {activeCategory === 'All' ? 'Our Network of Pros' : `Elite ${activeCategory}s`}
                  </h2>
                  <p className="text-white/30 text-lg">Top-rated verified professionals ready for dispatch.</p>
                </div>
              </div>
              
              <div className="relative group w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-all" size={20} />
                <input
                  type="text"
                  placeholder={`Search professionals by name or specialty...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-[2rem] glass-panel border-white/5 outline-none focus:border-amber-primary/30 focus:bg-amber-primary/[0.01] transition-all text-base text-white placeholder:text-white/10 shadow-premium"
                />
              </div>
            </div>

            {/* CUSTOM PREMIUM DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-6 px-8 py-5 glass-panel rounded-2xl border-white/5 transition-all duration-300 ${isSortOpen ? 'border-amber-primary/30 bg-amber-primary/5' : ''}`}
              >
                <Filter size={16} className={isSortOpen ? 'text-amber-primary' : 'text-white/30'} />
                <span className="text-[10px] text-white font-black uppercase tracking-widest min-w-[140px] text-left">
                  {sortOption}
                </span>
                <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                  <Zap size={14} className={isSortOpen ? 'text-amber-primary' : 'text-white/20'} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 glass-panel border-white/10 p-3 rounded-3xl z-[50] shadow-2xl backdrop-blur-3xl overflow-hidden"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          sortOption === option 
                          ? 'bg-amber-primary/10 text-amber-primary' 
                          : 'text-white/40 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 size={48} className="text-amber-primary animate-spin" />
              <p className="text-white/40 font-serif text-xl italic">Curating elite professionals...</p>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="glass-panel p-32 text-center flex flex-col items-center justify-center rounded-[3rem] border-dashed border-white/10">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                <Search className="text-white/10" size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-4">No professionals found</h3>
              <p className="text-white/30 max-w-sm mx-auto text-lg font-light">Try searching for a different name or checking another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              <AnimatePresence mode='popLayout'>
                {filteredProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-10 rounded-[3rem] border-white/5 shadow-premium flex flex-col group hover:border-amber-primary/20 transition-all duration-500 h-full"
                  >
                    {/* Provider Header */}
                    <div className="flex items-start justify-between mb-10">
                      <div className="flex gap-6">
                        <div className="relative">
                          <img src={provider.avatar} alt={provider.name} className="w-20 h-20 rounded-[2rem] object-cover border-2 border-white/10 group-hover:border-amber-primary/50 transition-all duration-500 shadow-premium" />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center border-4 border-dark-bg text-white">
                            <CheckCircle2 size={16} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-bold mb-1">{provider.name}</h3>
                          <p className="text-[11px] text-amber-primary font-black uppercase tracking-widest mb-3">{provider.service}</p>
                          <div className="flex items-center gap-2 text-white/30 text-sm">
                            <Star size={14} className="text-warning fill-warning" />
                            <span className="font-bold text-white">{provider.rating}</span>
                            <span className="text-xs text-white/20">({provider.reviews} Trust Votes)</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border ${
                        provider.status === 'Available' 
                        ? 'bg-success/5 text-success border-success/20 animate-pulse' 
                        : 'bg-warning/5 text-warning border-warning/20'
                      }`}>
                        {provider.status}
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="glass-panel p-5 rounded-2xl border-white/5 bg-white/[0.02] group-hover:bg-amber-primary/5 transition-all">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Reliability</p>
                        <p className="text-3xl font-mono font-bold text-success">{provider.reliabilityScore}%</p>
                      </div>
                      <div className="glass-panel p-5 rounded-2xl border-white/5 bg-white/[0.02] group-hover:bg-blue-500/5 transition-all">
                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Response</p>
                        <p className="text-3xl font-mono font-bold text-blue-400">{provider.responseTime}</p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="space-y-5 mb-12 flex-1">
                      <div className="flex justify-between items-center py-4 border-y border-white/5">
                        <div className="flex items-center gap-3 text-white/40">
                          <ShieldCheck size={16} />
                          <span className="text-sm font-medium">Verified Jobs</span>
                        </div>
                        <span className="text-lg font-bold text-white">{provider.jobsCompleted}+</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <div className="flex items-center gap-3 text-white/40">
                          <Clock size={16} />
                          <span className="text-sm font-medium">Experience</span>
                        </div>
                        <span className="text-lg font-bold text-white">{provider.experience} Years</span>
                      </div>
                    </div>

                    {/* Footer CTAs */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto gap-4">
                      <div className="flex flex-col">
                        <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Fee Range</p>
                        <p className="text-lg font-bold text-white">{provider.priceRange.split(' - ')[0]}+</p>
                      </div>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => window.open(`tel:${provider.phone || '9979265140'}`)}
                           className="p-4 rounded-2xl glass-panel border-white/10 text-white hover:bg-white/10 transition-all"
                         >
                            <Phone size={20} />
                         </button>
                         <button 
                           onClick={() => window.open(`https://wa.me/${(provider.phone || '9979265140').replace(/\D/g, '')}?text=${encodeURIComponent(`Hello! I'm interested in booking a session with you for ${provider.service} services through HomeTruth AI.`)}`)}
                           className="btn-amber !py-4 !px-8 text-sm font-bold flex items-center justify-center gap-3 shadow-amber-glow"
                         >
                            Book Session <ArrowRight size={18} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Global CTA */}
        <section className="mt-48">
          <div className="glass-panel p-20 rounded-[4rem] text-center relative overflow-hidden border-white/5">
            <div className="absolute inset-0 bg-amber-primary/[0.02] pointer-events-none"></div>
            <div className="w-24 h-24 rounded-[2.5rem] bg-amber-primary/10 border border-amber-primary/30 flex items-center justify-center mb-10 mx-auto shadow-amber-glow-strong">
              <Users size={48} className="text-amber-primary" />
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif font-bold mb-8">Ready to Join the <span className="text-gradient italic">Network?</span></h2>
            <p className="text-white/30 text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">Are you a professional providing world-class home services? Apply to join our elite verified network.</p>
            <Link to="/signup" className="btn-amber inline-block !py-6 !px-16 text-lg font-bold shadow-amber-glow-strong">Apply as Professional</Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServicesPage;
