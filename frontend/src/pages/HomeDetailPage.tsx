import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldAlert, Zap, Droplets, Volume2, Hospital, School, Train, Calculator, UserCheck, MessageSquare, Box, ArrowLeft, Heart, Share2, Star, Map, Info } from 'lucide-react';
import ThreeViewerModal from '../components/ThreeViewerModal';

const HomeDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  // Mock data for a single home
  const home = {
    id: '1',
    title: 'Modern Luxury Apartment',
    address: '123, Judges Bungalow Rd, Satellite, Ahmedabad - 380015',
    rent: 45000,
    healthScore: 85,
    riskLevel: 'low',
    type: 'Apartment',
    images: [
      '/assets/images/hero_villa.png',
      '/assets/images/apartment.png',
    ],
    beds: 3,
    baths: 2,
    area: 1500,
    trueCost: {
      rent: 45000,
      maintenance: 5000,
      utilities: 3000,
      repairs: 1000,
      societyCharges: 2000,
      total: 56000
    },
    hiddenIssues: [
      { issue: 'Dampness Risk', severity: 'warning', description: 'Possible moisture seepage in kitchen wall during heavy rains.' },
      { issue: 'Water Hardness', severity: 'warning', description: 'Area has high TDS levels. RO purifier recommended.' },
    ],
    areaInsights: {
      safetyScore: 88,
      waterReliability: 75,
      powerReliability: 90,
      noiseLevel: 'Moderate',
      airQuality: 65,
      nearestHospital: '0.8 km',
      nearestSchool: '1.2 km',
      nearestMetro: '0.5 km'
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen pt-24 pb-20 px-6 lg:px-12 text-white/90">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-amber-primary transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={16} /> Back to Search
          </button>
          <div className="flex gap-4">
            <button className="p-3 rounded-xl glass-panel hover:text-critical transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-3 rounded-xl glass-panel hover:text-amber-primary transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            
            {/* Header */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-amber-primary/10 border border-amber-primary/30 text-amber-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                  {home.type}
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Satellite, Ahmedabad
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">{home.title}</h1>
              <p className="text-white/40 text-lg flex items-center gap-2"><MapPin size={20} className="text-amber-primary" /> {home.address}</p>
            </section>

            {/* Gallery */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
              <div className="md:col-span-8 rounded-card-lg overflow-hidden group relative">
                <img src={home.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent"></div>
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="rounded-card-lg overflow-hidden group relative">
                  <img src={home.images[1]} alt="Sub" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent"></div>
                </div>
                <div className="rounded-card-lg overflow-hidden group relative cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="More" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/40">
                    <span className="text-3xl font-bold">+5</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Photos</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Health Report */}
            <section className="glass-panel p-10 rounded-card-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-primary/5 blur-[80px] pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-serif font-bold flex items-center gap-3">
                    <ShieldAlert className="text-amber-primary" /> AI Verification Report
                  </h3>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Status</p>
                    <p className="text-success font-bold flex items-center gap-2"><Star size={14} fill="currentColor" /> Verified Safe</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-4 flex flex-col items-center justify-center py-6 border-r border-white/5">
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="74" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                        <circle 
                          cx="80" cy="80" r="74" fill="transparent" stroke="url(#amber-grad)" strokeWidth="10" 
                          strokeDasharray={464.7}
                          strokeDashoffset={464.7 * (1 - home.healthScore / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F2C36B" />
                            <stop offset="100%" stopColor="#D4A853" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-mono font-bold">{home.healthScore}</span>
                        <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Score</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-center text-sm leading-relaxed max-w-[180px]">Excellent structural condition with minimal maintenance risks.</p>
                  </div>

                  <div className="md:col-span-8 space-y-8 py-6">
                    {[
                      { label: 'Structural Integrity', value: 92, color: 'bg-success' },
                      { label: 'Legal & Compliance', value: 100, color: 'bg-success' },
                      { label: 'Infrastructure & Utilities', value: 78, color: 'bg-amber-primary' },
                      { label: 'Community Rating', value: 85, color: 'bg-success' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                          <span className="text-white/50">{item.label}</span>
                          <span className="text-white">{item.value}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* True Cost Calculator */}
            <section className="glass-panel p-10 rounded-card-lg bg-amber-primary/[0.02]">
              <div className="flex items-center gap-3 mb-10">
                <Calculator className="text-amber-primary" />
                <h3 className="text-2xl font-serif font-bold">The "True Cost" Analysis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-5">
                  {[
                    { label: 'Base Monthly Rent', value: home.trueCost.rent },
                    { label: 'Mandatory Maintenance', value: home.trueCost.maintenance },
                    { label: 'Avg. Utility Bills (Water/Power)', value: home.trueCost.utilities },
                    { label: 'Annual Repairs (Amortized)', value: home.trueCost.repairs },
                    { label: 'Society Membership Fees', value: home.trueCost.societyCharges },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-white/40">{item.label}</span>
                      <span className="font-mono font-bold">₹{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Total Effective Rent</p>
                      <p className="text-4xl font-mono font-bold text-amber-primary">₹{home.trueCost.total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Deposit</p>
                      <p className="text-xl font-bold">₹1.50L</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="font-bold mb-4 flex items-center gap-2"><Info size={16} className="text-amber-primary" /> Pro Insight</h4>
                  <p className="text-sm text-white/50 leading-relaxed italic">"While the base rent is attractive, society charges and utilities add 24% to your monthly outflow. We've verified that water bills are unusually high in this specific building due to private tanker reliance."</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <aside className="w-full lg:w-[400px] space-y-8">
            <div className="glass-panel p-8 rounded-card-lg sticky top-32 border-white/10 shadow-premium">
              <div className="mb-10">
                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-2">Exclusive Offer</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-mono font-bold text-white">₹{home.rent.toLocaleString()}</h2>
                  <span className="text-white/30 text-sm mb-2">/month</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setIs3DModalOpen(true)}
                  className="w-full py-5 glass-panel rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-amber-primary/5 hover:border-amber-primary/50 transition-all text-amber-primary"
                >
                  <Box size={20} /> Launch 3D Walkthrough
                </button>
                <button 
                  onClick={() => navigate(`/map?id=1&lat=23.0225&lng=72.5714`)}
                  className="w-full py-5 glass-panel rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-white/5 transition-all text-white/60"
                >
                  <Map size={20} className="text-success" /> Explore Surroundings
                </button>
                <div className="h-px bg-white/5 my-6"></div>
                <button className="btn-amber w-full py-5 text-lg">Initialize Lease</button>
                <button className="w-full py-4 text-sm font-bold text-white/40 hover:text-white transition-colors">Request Inspection</button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6">Area Intelligence</h4>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-tighter">Hospital</p>
                    <p className="text-sm font-bold flex items-center gap-2"><Hospital size={14} className="text-amber-primary" /> {home.areaInsights.nearestHospital}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-tighter">Education</p>
                    <p className="text-sm font-bold flex items-center gap-2"><School size={14} className="text-blue-400" /> {home.areaInsights.nearestSchool}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-tighter">Transit</p>
                    <p className="text-sm font-bold flex items-center gap-2"><Train size={14} className="text-success" /> {home.areaInsights.nearestMetro}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-tighter">Noise</p>
                    <p className="text-sm font-bold flex items-center gap-2"><Volume2 size={14} className="text-warning" /> {home.areaInsights.noiseLevel}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ThreeViewerModal 
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        title={home.title}
        address={home.address}
      />
    </div>
  );
};

export default HomeDetailPage;
