import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, MapPin, Box, ArrowRight, Zap, Sparkles, Search, Loader2 } from 'lucide-react';
import ThreeViewerModal from '../components/ThreeViewerModal';
import api from '../services/api';

const VirtualToursPage = () => {
  const [activeTour, setActiveTour] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties');
        setProperties(response.data.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredTours = properties.filter(tour => {
    const tourCity = tour.city || '';
    return search === '' || 
      tour.title.toLowerCase().includes(search.toLowerCase()) || 
      tour.address.toLowerCase().includes(search.toLowerCase()) ||
      tourCity.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="max-w-4xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={12} /> Next-Gen Visualization
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-serif font-bold leading-tight mb-8"
          >
            Immersive <span className="text-gradient italic">3D Tours.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl lg:text-2xl font-light max-w-2xl leading-relaxed"
          >
            Step inside our most premium residences from anywhere in the world. Experience lifelike walkthroughs and interactive spatial models.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="mb-24 flex flex-col sm:flex-row gap-4 items-center max-w-4xl">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-all duration-500" size={20} />
            <input
              type="text"
              placeholder="Search locations or buildings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 outline-none focus:border-amber-primary/50 focus:bg-white/10 transition-all text-lg text-white placeholder:text-white/50 shadow-premium"
            />
          </div>
        </div>

        {/* Tours Grid - Cinematic Wide Style */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-amber-primary" />
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 glass-panel rounded-[3rem] border-white/5">
            <Box className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-2xl font-bold text-white/60">No properties found</h3>
            <p className="text-lg text-white/40 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card group overflow-hidden rounded-[3rem] border-white/5 cursor-pointer flex flex-col shadow-premium min-h-[550px]"
                onClick={() => setActiveTour(tour._id)}
              >
                {/* Image Area (Panoramic 21:9) */}
                <div className="relative aspect-[21/9] overflow-hidden shrink-0">
                  <img 
                    src={tour.image || (tour.images && tour.images[0]) || 'https://via.placeholder.com/1200'} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" 
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center border border-white/30 group-hover:border-amber-primary/50 group-hover:bg-amber-primary/10 transition-all shadow-premium"
                    >
                      <Play className="text-white group-hover:text-amber-primary ml-1 w-10 h-10 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-6 right-6 px-4 py-2 rounded-2xl bg-dark-bg/60 backdrop-blur-xl border border-white/10 text-[10px] font-black text-white font-mono tracking-widest flex items-center gap-2">
                    <Zap size={12} className="text-amber-primary" /> {Math.floor(Math.random() * 5) + 3}:00 MIN TOUR
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl glass-panel border-white/10 text-[9px] font-black text-amber-primary uppercase tracking-[0.3em]">
                    {tour.propertyType || tour.type || 'Property'}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-4xl lg:text-5xl font-serif font-bold group-hover:text-amber-primary transition-colors leading-tight line-clamp-2">{tour.title}</h3>
                      <div className="flex flex-col items-end shrink-0 pl-4">
                        <div className="flex items-center gap-2 text-white/20">
                          <Eye size={16} />
                          <span className="text-sm font-mono font-bold text-white/40">{Math.floor(Math.random() * 2000) + 500}</span>
                        </div>
                        <p className="text-[9px] text-white/10 font-black uppercase tracking-widest mt-1">Sessions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 w-fit mb-10">
                      <MapPin size={14} className="text-amber-primary" /> 
                      <span className="text-[11px] font-medium text-white/50">{tour.address}</span>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-primary/10 border border-amber-primary/20 flex items-center justify-center text-amber-primary">
                          <Box size={24} />
                        </div>
                        <div>
                          <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Spatial Tech</p>
                          <p className="text-white font-bold">Unreal Engine 5.4</p>
                        </div>
                     </div>

                     <button 
                      className="btn-amber !py-5 !px-12 text-sm font-bold flex items-center justify-center gap-4 shadow-amber-glow-strong group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTour(tour._id);
                      }}
                     >
                      Start Immersive Experience
                      <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 3D Viewer Modal */}
      <ThreeViewerModal 
        isOpen={!!activeTour}
        onClose={() => setActiveTour(null)}
        title={properties.find(t => t._id === activeTour)?.title}
        address={properties.find(t => t._id === activeTour)?.address}
      />
    </div>
  );
};

export default VirtualToursPage;
