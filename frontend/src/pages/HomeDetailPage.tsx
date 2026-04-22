import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldAlert, Zap, Droplets, Volume2, Hospital, School, Train, Calculator, UserCheck, MessageSquare, Box } from 'lucide-react';
import ThreeViewerModal from '../components/ThreeViewerModal';

const HomeDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [is3DModalOpen, setIs3DModalOpen] = React.useState(false);

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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/explore" className="hover:text-amber-primary">Explore</Link>
        <span>/</span>
        <span className="text-white">Property Details</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-amber-primary/10 text-amber-primary rounded-full text-xs font-bold">{home.type}</span>
              <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs">Indiranagar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{home.title}</h1>
            <p className="text-gray-400 flex items-center gap-2"><MapPin size={18} /> {home.address}</p>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[2rem] overflow-hidden h-[500px]">
            <div className="relative group overflow-hidden">
              <img src={home.images[0]} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="relative group overflow-hidden rounded-[1.5rem]">
                <img src={home.images[1]} alt="sub1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-[1.5rem]">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="sub2" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <span className="text-2xl font-bold text-white tracking-widest">+5 Photos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Score and Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle 
                    cx="64" cy="64" r="58" fill="transparent" stroke="#F5A623" strokeWidth="8" 
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 * (1 - home.healthScore / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-mono font-bold">{home.healthScore}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Score</span>
                </div>
              </div>
              <h4 className="font-bold text-success">Low Risk</h4>
              <p className="text-xs text-gray-400 mt-2">Excellent structural condition with minor warnings.</p>
            </div>

            <div className="md:col-span-2 glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: 'Structure Condition', value: 90, color: 'bg-success' },
                  { label: 'Past Issues History', value: 85, color: 'bg-success' },
                  { label: 'Area Quality', value: 75, color: 'bg-amber-primary' },
                  { label: 'Maintenance History', value: 80, color: 'bg-success' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hidden Problems */}
          <div className="glass-card p-6 border-l-4 border-amber-primary">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="text-amber-primary" /> AI-Detected Hidden Issues
            </h3>
            <div className="space-y-4">
              {home.hiddenIssues.map((issue, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{issue.issue}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      issue.severity === 'critical' ? 'bg-critical/20 text-critical' : 'bg-warning/20 text-warning'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* True Cost Breakdown */}
          <div className="glass-card p-6 bg-amber-primary/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="text-amber-primary" /> True Cost Breakdown
            </h3>
            <div className="space-y-3 mb-6">
              {[
                { label: 'Monthly Rent', value: home.trueCost.rent },
                { label: 'Maintenance Fee', value: home.trueCost.maintenance },
                { label: 'Estimated Utilities', value: home.trueCost.utilities },
                { label: 'Repairs Buffer', value: home.trueCost.repairs },
                { label: 'Society Charges', value: home.trueCost.societyCharges },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-gray-400">
                  <span>{item.label}</span>
                  <span className="font-mono">₹{item.value.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-xl">
                <span>Total Monthly Cost</span>
                <span className="text-amber-primary font-mono">₹{home.trueCost.total.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic">*Real-world estimates based on community data and area trends.</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[400px] space-y-6">
          {/* Action Card */}
          <div className="glass-card p-6 sticky top-24">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Monthly Rent</p>
                <h2 className="text-3xl font-mono font-bold text-amber-primary">₹{home.rent.toLocaleString()}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Security Deposit</p>
                <p className="font-bold">₹1.5L</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setIs3DModalOpen(true)}
                className="w-full py-4 text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-amber-primary to-amber-500 text-black font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(245,166,35,0.3)]"
              >
                <Box size={20} /> View Interactive 3D Tour
              </button>
              <button
                onClick={() => navigate('/map?id=1&lat=23.0225&lng=72.5714')}
                className="btn-glass w-full py-3 flex items-center justify-center gap-2 text-sm border border-green-500/30 hover:border-green-500"
              >
                <MapPin size={16} className="text-green-400" /> See Location on Google Maps
              </button>
              <button className="btn-amber w-full py-4 text-lg mt-2">Book Full Inspection</button>
              <button className="btn-glass w-full py-4">Save Property</button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><MapPin size={16} /> Area Connectivity</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Hospital size={14} className="text-success" /> Hospital: {home.areaInsights.nearestHospital}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <School size={14} className="text-blue-400" /> School: {home.areaInsights.nearestSchool}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Train size={14} className="text-amber-primary" /> Metro: {home.areaInsights.nearestMetro}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <UserCheck size={14} className="text-purple-400" /> Security: 24/7
                </div>
              </div>
            </div>
          </div>
          
          {/* Book a Service Panel */}
          <div className="glass-card p-6">
            <h4 className="font-bold mb-4">Book a Service for this Home</h4>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mb-4 outline-none">
              <option>Deep Cleaning</option>
              <option>Pest Control</option>
              <option>Home Inspection</option>
              <option>Interior Consultation</option>
            </select>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm">Book Now</button>
          </div>
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
