import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, Ruler, IndianRupee, MessageCircle, ArrowRight, ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const SellHomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    propertyType: 'Villa',
    location: '',
    area: '',
    expectedPrice: '',
    name: ''
  });

  const handleWhatsAppConnect = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello HomeTruth AI! I'm interested in selling my property.
    
Property Details:
- Type: ${formData.propertyType}
- Location: ${formData.location}
- Area: ${formData.area}
- Expected Price: ${formData.expectedPrice}
- Contact Name: ${formData.name}

Please guide me with the offline verification process.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919979265140?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Connecting to WhatsApp...');
  };

  const propertyTypes = ['Luxury Villa', 'Premium Apartment', 'Penthouse', 'Residential Plot', 'Commercial Space'];

  return (
    <div className="min-h-screen bg-[#0F0905] pt-32 pb-20 px-6 selection:bg-amber-primary/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left: Content & Trust Factors */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-primary/10 border border-amber-primary/20 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">Direct Seller Portal</span>
          <h1 className="text-6xl font-serif font-bold text-white mb-8 leading-tight">Sell Your Property <br /><span className="text-gradient">With Confidence.</span></h1>
          <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-lg">
            List your home in our exclusive digital catalog. We handle the curation and connect you with high-intent buyers after a physical audit.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-amber-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Physical Audit</h3>
                <p className="text-white/30 text-xs leading-relaxed">Mandatory offline verification to ensure asset quality.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-amber-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="text-amber-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Direct Connect</h3>
                <p className="text-white/30 text-xs leading-relaxed">Instant WhatsApp connectivity with our sales team.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Modern Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 rounded-[4rem] border-white/5 bg-white/[0.01] shadow-premium relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-8">Asset Details</h2>
            <form onSubmit={handleWhatsAppConnect} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Property Type</label>
                  <div className="relative group">
                    <select 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 appearance-none font-medium transition-all hover:bg-white/[0.05] cursor-pointer"
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type} className="bg-[#0F0905] text-white py-4">{type}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-focus-within:text-amber-primary transition-colors">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Location</label>
                  <div className="relative group">
                    <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="e.g. South Delhi"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Total Area (sq.ft)</label>
                  <div className="relative group">
                    <Ruler size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="e.g. 2400"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Expected Price</label>
                  <div className="relative group">
                    <IndianRupee size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder="e.g. 5.5 Cr"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({...formData, expectedPrice: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Owner Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-[#25D366] hover:bg-[#20bd5c] rounded-3xl text-white font-bold text-lg shadow-[0_10px_40px_rgba(37,211,102,0.2)] flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-6"
              >
                <MessageCircle size={24} />
                Connect on WhatsApp
              </button>

              <p className="text-center text-[10px] text-white/20 font-medium tracking-wider">
                BY CONNECTING, YOU AGREE TO OUR PHYSICAL AUDIT TERMS
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellHomePage;
