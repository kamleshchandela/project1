import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Heart, Box, Map, Star, Info, ArrowRight, Filter, Zap, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThreeViewerModal from '../components/ThreeViewerModal';

const mockHomes = [
  {
    id: '1',
    title: 'Modern Luxury Apartment',
    address: 'Satellite, Ahmedabad',
    rent: 28000,
    healthScore: 85,
    riskLevel: 'low',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2,
    area: 1500,
    lat: 23.0225, lng: 72.5714,
  },
  {
    id: '2',
    title: 'Premium Villa',
    address: 'Bodakdev, Ahmedabad',
    rent: 75000,
    healthScore: 92,
    riskLevel: 'low',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 4,
    area: 3200,
    lat: 23.0395, lng: 72.5079,
  },
  {
    id: '3',
    title: 'Cozy Independent House',
    address: 'Bopal, Ahmedabad',
    rent: 22000,
    healthScore: 72,
    riskLevel: 'medium',
    type: 'House',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2,
    area: 1800,
    lat: 23.0732, lng: 72.5182,
  },
  {
    id: '4',
    title: 'Smart Tech Studio',
    address: 'Kalwa Chowk, Junagadh',
    rent: 10000,
    healthScore: 88,
    riskLevel: 'low',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    beds: 1,
    baths: 1,
    area: 600,
    lat: 21.5222, lng: 70.4579,
  },
  {
    id: '5',
    title: 'Spacious Family Home',
    address: 'Dhal Rd, Junagadh',
    rent: 16000,
    healthScore: 75,
    riskLevel: 'medium',
    type: 'House',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2,
    area: 1400,
    lat: 21.5300, lng: 70.4650,
  },
  {
    id: '6',
    title: 'Budget Apartment',
    address: 'University Rd, Junagadh',
    rent: 8000,
    healthScore: 60,
    riskLevel: 'high',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80',
    beds: 2,
    baths: 1,
    area: 900,
    lat: 21.5150, lng: 70.4700,
  },
];

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [active3DTour, setActive3DTour] = useState<string | null>(null);
  
  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(200000);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('score');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { id: 'score', label: 'AI Health Score' },
    { id: 'price-low', label: 'Lowest Price' },
    { id: 'newest', label: 'Recently Added' }
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleRisk = (level: string) => {
    setSelectedRiskLevels(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);
  };

  const filteredHomes = mockHomes
    .filter(home => {
      const matchSearch = search === '' || 
        home.title.toLowerCase().includes(search.toLowerCase()) || 
        home.address.toLowerCase().includes(search.toLowerCase());
      
      const homeTypeMap: Record<string, string> = { 'House': 'Independent House', 'Apartment': 'Apartment', 'Villa': 'Villa', 'PG': 'PG' };
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(homeTypeMap[home.type] || home.type);
      
      const matchBudget = home.rent <= budget;
      
      const riskMap: Record<string, string> = { 'low': 'Low', 'medium': 'Medium', 'high': 'High' };
      const matchRisk = selectedRiskLevels.length === 0 || selectedRiskLevels.includes(riskMap[home.riskLevel]);
      
      return matchSearch && matchType && matchBudget && matchRisk;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.healthScore - a.healthScore;
      if (sortBy === 'price-low') return a.rent - b.rent;
      return parseInt(b.id) - parseInt(a.id);
    });

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Zap size={12} /> Live Market Pulse
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              Find Your <span className="text-gradient italic">Sanctuary.</span>
            </h1>
            <p className="text-white/40 text-xl font-light">Explore 12,000+ verified residences with real-time AI risk analysis.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 glass-panel rounded-2xl text-[10px] font-black text-white/30 uppercase tracking-widest border-white/5">
              <ShieldCheck size={16} className="text-success" /> AI Shield Active
            </div>
          </div>
        </div>

        {/* Compact Search & Filter Bar */}
        <div className="mb-16 flex flex-col sm:flex-row gap-4 items-center max-w-4xl">
          <button className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border-white/5 hover:border-amber-primary/30 transition-all group whitespace-nowrap">
            <Filter size={18} className="text-amber-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xs font-black uppercase tracking-widest text-white/60">Parameters</span>
          </button>
          
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-all duration-500" size={20} />
            <input
              type="text"
              placeholder="Search locations or buildings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-2xl glass-panel border-white/5 outline-none focus:border-amber-primary/30 focus:bg-amber-primary/[0.01] transition-all text-base text-white placeholder:text-white/10 shadow-premium"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - FULL HEIGHT STICKY */}
          <aside className="hidden lg:block w-80 sticky top-32 h-[calc(100vh-160px)]">
            <div className="glass-panel h-full p-8 rounded-[3rem] border-white/5 shadow-premium flex flex-col">
              <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
                <Filter size={18} className="text-amber-primary" />
                Refine Search
              </h3>
              
              <div className="space-y-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {/* Property Types */}
                <div>
                  <label className="text-[9px] text-white/20 block mb-6 font-black uppercase tracking-[0.4em]">Property Type</label>
                  <div className="space-y-4">
                    {['Apartment', 'Independent House', 'Villa', 'PG'].map(type => (
                      <label key={type} className="flex items-center justify-between cursor-pointer group">
                        <span className={`text-xs font-bold transition-colors ${selectedTypes.includes(type) ? 'text-amber-primary' : 'text-white/40 group-hover:text-white'}`}>{type}</span>
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 transition-all ${
                          selectedTypes.includes(type) ? 'bg-amber-primary border-amber-primary' : 'border-white/10 group-hover:border-white/30'
                        }`}>
                          {selectedTypes.includes(type) && <div className="w-2 h-2 bg-dark-bg rounded-sm" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="pt-8 border-t border-white/5">
                  <div className="flex justify-between items-end mb-6">
                    <label className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">Monthly Budget</label>
                    <span className="text-amber-primary font-mono font-bold">₹{(budget / 1000).toFixed(0)}k</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="200000" 
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-amber-primary h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-[8px] text-white/20 mt-4 font-mono font-bold">
                    <span>MIN ₹10k</span>
                    <span>MAX ₹200k+</span>
                  </div>
                </div>

                {/* Risk Tolerance */}
                <div className="pt-8 border-t border-white/5">
                  <label className="text-[9px] text-white/20 block mb-6 font-black uppercase tracking-[0.4em]">AI Risk Filter</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button 
                        key={level} 
                        onClick={() => toggleRisk(level)}
                        className={`py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${
                          selectedRiskLevels.includes(level) 
                            ? 'bg-amber-primary text-dark-bg border-amber-primary shadow-amber-glow' 
                            : 'border-white/5 text-white/40 hover:border-white/20 hover:text-white backdrop-blur-xl'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setSearch(''); setSelectedTypes([]); setSelectedRiskLevels([]); setBudget(200000); }}
                className="w-full mt-8 pt-6 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-amber-primary transition-all border-t border-white/5 flex items-center justify-center gap-2"
              >
                Reset All Parameters
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-10">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Found {filteredHomes.length} Residential Assets</p>
              
              {/* CUSTOM PREMIUM DROPDOWN */}
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={`flex items-center gap-6 px-6 py-3 glass-panel rounded-2xl border-white/5 transition-all duration-300 ${isSortOpen ? 'border-amber-primary/30 bg-amber-primary/5' : ''}`}
                >
                  <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Sort:</span>
                  <span className="text-[10px] text-white font-black uppercase tracking-widest min-w-[120px] text-left">
                    {sortOptions.find(o => o.id === sortBy)?.label}
                  </span>
                  <motion.div animate={{ rotate: isSortOpen ? 180 : 0 }}>
                    <Zap size={12} className={isSortOpen ? 'text-amber-primary' : 'text-white/20'} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 glass-panel border-white/10 p-3 rounded-3xl z-[50] shadow-2xl backdrop-blur-3xl overflow-hidden"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                            sortBy === option.id 
                            ? 'bg-amber-primary/10 text-amber-primary' 
                            : 'text-white/40 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {filteredHomes.length === 0 ? (
              <div className="glass-panel p-32 text-center flex flex-col items-center justify-center rounded-[3rem] border-dashed border-white/10">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                  <Search className="text-white/10" size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4">No matching assets</h3>
                <p className="text-white/30 max-w-sm mx-auto text-lg font-light">We couldn't find any properties matching your current filter set. Try expanding your parameters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
                <AnimatePresence mode='popLayout'>
                  {filteredHomes.map((home) => (
                    <motion.div
                      key={home.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -10 }}
                      className="glass-card group overflow-hidden rounded-[2.5rem] border-white/5 flex flex-col shadow-premium min-h-[580px]"
                    >
                      {/* 1. Cinematic Image Area */}
                      <div className="relative aspect-[21/9] overflow-hidden shrink-0">
                        <img src={home.image} alt={home.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905]/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className={`absolute top-6 right-6 px-4 py-2 rounded-2xl text-[10px] font-black backdrop-blur-2xl border border-white/10 flex items-center gap-2 ${
                          home.healthScore >= 80 ? 'text-success shadow-[0_0_20px_rgba(16,185,129,0.3)]' : home.healthScore >= 60 ? 'text-warning' : 'text-critical'
                        }`}>
                          <Star size={12} fill="currentColor" /> {home.healthScore} AI SCORE
                        </div>
                        
                        <button className="absolute top-6 left-6 p-3 rounded-2xl bg-dark-bg/40 backdrop-blur-md border border-white/10 hover:bg-critical/20 hover:text-critical transition-all">
                          <Heart size={18} />
                        </button>
                      </div>

                      {/* 2. Content Container - Flex Stack */}
                      <div className="p-10 flex flex-col flex-1">
                        
                        {/* Title & Type Block */}
                        <div className="mb-8">
                          <span className="text-[10px] text-amber-primary font-black uppercase tracking-[0.4em] mb-3 block">{home.type}</span>
                          <h3 className="text-3xl lg:text-4xl font-serif font-bold group-hover:text-amber-primary transition-colors leading-[1.1] line-clamp-2">
                            {home.title}
                          </h3>
                        </div>

                        {/* Location Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 w-fit mb-10">
                          <MapPin size={14} className="text-amber-primary" /> 
                          <span className="text-[11px] font-medium text-white/50 truncate">{home.address}</span>
                        </div>

                        {/* Middle: Specs Grid (Symmetrical row) */}
                        <div className="grid grid-cols-3 gap-0 border-y border-white/5 py-8 mb-10">
                          <div className="text-center flex flex-col items-center">
                            <p className="text-[9px] text-white/10 font-black uppercase tracking-widest mb-2">Beds</p>
                            <p className="text-white font-bold text-xl">{home.beds}</p>
                          </div>
                          <div className="text-center border-x border-white/10 flex flex-col items-center px-4">
                            <p className="text-[9px] text-white/10 font-black uppercase tracking-widest mb-2">Baths</p>
                            <p className="text-white font-bold text-xl">{home.baths}</p>
                          </div>
                          <div className="text-center flex flex-col items-center">
                            <p className="text-[9px] text-white/10 font-black uppercase tracking-widest mb-2">Area (SqFt)</p>
                            <p className="text-white font-bold text-xl">{home.area}</p>
                          </div>
                        </div>

                        {/* Bottom: Final CTA Row (Price + Button) */}
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-4xl font-mono font-bold text-white tracking-tighter">₹{(home.rent/1000).toFixed(0)}k</span>
                            <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">Total Monthly</p>
                          </div>
                          
                          <button 
                            onClick={() => navigate(`/home/${home.id}`)}
                            className="btn-amber !py-5 !px-8 text-sm font-bold flex items-center justify-center gap-4 shadow-amber-glow-strong whitespace-nowrap group"
                          >
                            View Truth Report
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <ThreeViewerModal 
        isOpen={!!active3DTour}
        onClose={() => setActive3DTour(null)}
        title={mockHomes.find(h => h.id === active3DTour)?.title}
        address={mockHomes.find(h => h.id === active3DTour)?.address}
      />
    </div>
  );
};

export default ExplorePage;
