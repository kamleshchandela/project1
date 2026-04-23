import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, MapPin, Box, ArrowRight, Zap, Sparkles } from 'lucide-react';
import ThreeViewerModal from '../components/ThreeViewerModal';

const virtualTours = [
  {
    id: '1',
    title: 'Skyline Penthouse',
    address: 'Bandra West, Mumbai',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    duration: '03:45',
    views: '1.2k',
    type: 'Penthouse'
  },
  {
    id: '2',
    title: 'Modern Oasis Villa',
    address: 'Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    duration: '05:20',
    views: '850',
    type: 'Villa'
  },
  {
    id: '3',
    title: 'Minimalist Smart Home',
    address: 'Indiranagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    duration: '04:15',
    views: '2.4k',
    type: 'Apartment'
  },
  {
    id: '4',
    title: 'Heritage Luxury Estate',
    address: 'Lutyens, New Delhi',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    duration: '06:10',
    views: '3.1k',
    type: 'Estate'
  },
  {
    id: '5',
    title: 'Eco-Friendly Waterfront',
    address: 'Marine Drive, Kochi',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    duration: '04:50',
    views: '940',
    type: 'Villa'
  },
  {
    id: '6',
    title: 'Urban Chic Loft',
    address: 'Koregaon Park, Pune',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    duration: '02:30',
    views: '1.8k',
    type: 'Loft'
  }
];

const VirtualToursPage: React.FC = () => {
  const [activeTour, setActiveTour] = useState<string | null>(null);

  return (
    <div className="bg-[#0F0905] min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-amber-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="max-w-4xl mb-24">
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

        {/* Tours Grid - Cinematic Wide Style */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
          {virtualTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card group overflow-hidden rounded-[3rem] border-white/5 cursor-pointer flex flex-col shadow-premium min-h-[550px]"
              onClick={() => setActiveTour(tour.id)}
            >
              {/* Image Area (Panoramic 21:9) */}
              <div className="relative aspect-[21/9] overflow-hidden shrink-0">
                <img 
                  src={tour.image} 
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
                  <Zap size={12} className="text-amber-primary" /> {tour.duration} MIN TOUR
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl glass-panel border-white/10 text-[9px] font-black text-amber-primary uppercase tracking-[0.3em]">
                  {tour.type}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-10 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl lg:text-5xl font-serif font-bold group-hover:text-amber-primary transition-colors leading-tight">{tour.title}</h3>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 text-white/20">
                        <Eye size={16} />
                        <span className="text-sm font-mono font-bold text-white/40">{tour.views}</span>
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
                      setActiveTour(tour.id);
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
      </div>

      {/* 3D Viewer Modal */}
      <ThreeViewerModal 
        isOpen={!!activeTour}
        onClose={() => setActiveTour(null)}
        title={virtualTours.find(t => t.id === activeTour)?.title}
        address={virtualTours.find(t => t.id === activeTour)?.address}
      />
    </div>
  );
};

export default VirtualToursPage;
