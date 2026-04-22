import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Heart, Box, Map } from 'lucide-react';
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
      return parseInt(b.id) - parseInt(a.id); // 'newest' mock fallback
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search any home, area, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-card-sm glass-card outline-none focus:ring-2 ring-amber-primary/50 transition-all"
          />
        </div>
        <button className="btn-glass flex items-center gap-2 px-8">
          <SlidersHorizontal size={20} /> Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-72 space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-400 block mb-2 font-bold uppercase tracking-wider">Home Type</label>
                <div className="space-y-3">
                  {['Apartment', 'Independent House', 'Villa', 'PG'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        selectedTypes.includes(type) ? 'bg-amber-primary border-amber-primary' : 'border-white/20 group-hover:border-amber-primary'
                      }`}>
                        {selectedTypes.includes(type) && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
                      </div>
                      <span className={`text-sm transition-colors ${selectedTypes.includes(type) ? 'text-white font-bold' : 'text-gray-300'}`}>{type}</span>
                      <input type="checkbox" className="hidden" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="text-sm text-gray-400 block mb-4 font-bold uppercase tracking-wider">Max Budget: <span className="text-amber-primary font-mono ml-2">₹{(budget / 1000).toFixed(0)}k</span></label>
                <input 
                  type="range" 
                  min="10000" 
                  max="200000" 
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-amber-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                />
                <div className="flex justify-between text-xs text-gray-500 mt-3 font-mono">
                  <span>₹10k</span>
                  <span>₹200k+</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <label className="text-sm text-gray-400 block mb-3 font-bold uppercase tracking-wider">Risk Level</label>
                <div className="flex flex-wrap gap-2">
                  {['Low', 'Medium', 'High'].map(level => (
                    <button 
                      key={level} 
                      onClick={() => toggleRisk(level)}
                      className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all ${
                        selectedRiskLevels.includes(level) 
                          ? 'bg-amber-primary text-black border-amber-primary' 
                          : 'border-white/10 text-gray-400 hover:border-amber-primary hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Showing {filteredHomes.length} homes</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-primary transition-colors"
              >
                <option value="score">Highest Score</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {filteredHomes.length === 0 ? (
            <div className="glass-card p-12 text-center flex flex-col items-center justify-center h-64">
              <Search className="text-gray-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">No homes found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedTypes([]); setSelectedRiskLevels([]); setBudget(200000); }}
                className="text-amber-primary hover:underline mt-4 text-sm font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredHomes.map((home) => (
                <motion.div
                key={home.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card overflow-hidden group hover:shadow-amber-primary/10 transition-all"
              >
                <div className="relative h-48">
                  <img src={home.image} alt={home.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                    home.healthScore >= 80 ? 'bg-success/80' : home.healthScore >= 60 ? 'bg-warning/80' : 'bg-critical/80'
                  }`}>
                    Score: {home.healthScore}
                  </div>
                  <button className="absolute top-4 left-4 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-critical/80 transition-colors">
                    <Heart size={16} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs text-amber-primary font-bold uppercase">{home.type}</span>
                      <h3 className="text-xl font-bold">{home.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-mono font-bold text-amber-primary">₹{home.rent.toLocaleString()}</span>
                      <p className="text-[10px] text-gray-500">/month</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                    <MapPin size={14} /> {home.address}
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase">Beds</p>
                      <p className="font-bold">{home.beds}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase">Baths</p>
                      <p className="font-bold">{home.baths}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500 uppercase">Area</p>
                      <p className="font-bold text-sm">{home.area} <span className="text-[8px]">sqft</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <button
                      onClick={() => setActive3DTour(home.id)}
                      className="btn-glass w-full flex items-center justify-center gap-1.5 text-xs py-2.5"
                    >
                      <Box size={14} className="text-amber-primary" /> 3D
                    </button>
                    <button
                      onClick={() => navigate(`/map?id=${home.id}&lat=${home.lat}&lng=${home.lng}`)}
                      className="btn-glass w-full flex items-center justify-center gap-1.5 text-xs py-2.5"
                    >
                      <Map size={14} className="text-green-400" /> Map
                    </button>
                    <Link to={`/home/${home.id}`} className="btn-amber w-full flex items-center justify-center text-xs py-2.5">
                      Report
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
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
