import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, MapPin } from 'lucide-react';
import ThreeViewerModal from '../components/ThreeViewerModal';

const virtualTours = [
  {
    id: '1',
    title: 'Skyline Penthouse',
    address: 'Bandra West, Mumbai',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    duration: '03:45',
    views: '1.2k',
  },
  {
    id: '2',
    title: 'Modern Oasis Villa',
    address: 'Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    duration: '05:20',
    views: '850',
  },
  {
    id: '3',
    title: 'Minimalist Smart Home',
    address: 'Indiranagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    duration: '04:15',
    views: '2.4k',
  },
  {
    id: '4',
    title: 'Heritage Luxury Estate',
    address: 'Lutyens, New Delhi',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    duration: '06:10',
    views: '3.1k',
  },
  {
    id: '5',
    title: 'Eco-Friendly Waterfront',
    address: 'Marine Drive, Kochi',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    duration: '04:50',
    views: '940',
  },
  {
    id: '6',
    title: 'Urban Chic Loft',
    address: 'Koregaon Park, Pune',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    duration: '02:30',
    views: '1.8k',
  }
];

const VirtualToursPage: React.FC = () => {
  const [activeTour, setActiveTour] = React.useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-serif mb-4"
        >
          Immersive <span className="text-amber-primary">3D Tours</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Step inside our most premium properties from the comfort of your home. Experience realistic walkthroughs and interactive 3D models before you decide.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {virtualTours.map((tour, index) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card overflow-hidden group cursor-pointer"
            onClick={() => setActiveTour(tour.id)}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-1 w-8 h-8" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-mono flex items-center gap-1">
                {tour.duration}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold group-hover:text-amber-primary transition-colors">{tour.title}</h3>
              </div>
              <p className="text-sm text-gray-400 flex items-center gap-1 mb-4">
                <MapPin size={14} /> {tour.address}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye size={16} /> {tour.views} views
                </div>
                <button 
                  className="text-amber-primary text-sm font-bold hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTour(tour.id);
                  }}
                >
                  Start Tour
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
