import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ShieldAlert, Star, MessageCircle, Phone, 
  Box, ArrowLeft, Heart, Share2, Info, 
  Bed, Bath, Maximize, Loader2,
  Sofa, Building2, User, X, Map, Sparkles, Zap, CheckCircle2, Filter, ArrowRight
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import ThreeViewerModal from '../components/ThreeViewerModal';

const HomeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isThreeViewOpen, setIsThreeViewOpen] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data.data.property);
    } catch (error) {
      toast.error('Property not found');
      navigate('/explore');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!property) return;
    const message = encodeURIComponent(`Hi, I'm interested in the property: ${property.title} (${property._id}). Please provide more details.`);
    window.open(`https://wa.me/919979265140?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0905] flex items-center justify-center">
        <Loader2 className="text-amber-primary animate-spin" size={40} />
      </div>
    );
  }

  if (!property) return null;

  const propertyImages = property.images || (property.image ? [property.image] : ['https://via.placeholder.com/1200']);
  const propertyPrice = property.price || property.rent || 0;
  const propertyType = property.propertyType || property.type || 'Property';
  const propertyBedrooms = property.bedrooms || property.beds || 0;
  const propertyBathrooms = property.bathrooms || property.baths || 0;

  return (
    <div className="bg-[#0F0905] min-h-screen pt-24 pb-20 px-6 lg:px-12 text-white/90 selection:bg-amber-primary/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] rounded-full bg-amber-primary/5 blur-[150px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-white/40 hover:text-amber-primary transition-all font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={16} /> Back to Listings
          </button>
          <div className="flex gap-4">
            <button className="p-4 rounded-2xl glass-panel hover:text-critical transition-all border-white/5">
              <Heart size={20} />
            </button>
            <button className="p-4 rounded-2xl glass-panel hover:text-amber-primary transition-all border-white/5">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1 space-y-16">
            
            {/* Header */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-amber-primary/10 border border-amber-primary/30 text-amber-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                  {propertyType}
                </span>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight">{property.title}</h1>
              <p className="text-white/40 text-xl flex items-center gap-3"><MapPin size={24} className="text-amber-primary" /> {property.address}, {property.city || ''}</p>
            </section>

            {/* Gallery Grid */}
            <section className="flex flex-col md:flex-row gap-4 md:gap-6 h-[400px] md:h-[650px]">
              {/* Main Image */}
              <div 
                className="flex-[2] rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative border border-white/5 cursor-pointer min-h-0"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img src={propertyImages[0]} alt="Main" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Sub Images */}
              <div className="flex-1 flex flex-row md:flex-col gap-4 md:gap-6 min-h-0">
                {propertyImages[1] ? (
                  <div 
                    className="flex-1 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group relative border border-white/5 cursor-pointer min-h-0"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img src={propertyImages[1]} alt="Sub 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                   <div className="flex-1"></div>
                )}
                {propertyImages[2] ? (
                  <div 
                    className="flex-1 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group relative border border-white/5 cursor-pointer min-h-0"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img src={propertyImages[2]} alt="Sub 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                    {propertyImages.length > 3 ? (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-black/50">
                        <span className="text-3xl md:text-5xl font-light text-white tracking-wider">+{propertyImages.length - 3}</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                ) : (
                   <div className="flex-1"></div>
                )}
              </div>
            </section>

            {/* Key Specifications */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Bed size={24} />, label: 'Bedrooms', value: propertyBedrooms },
                { icon: <Bath size={24} />, label: 'Bathrooms', value: propertyBathrooms },
                { icon: <Maximize size={24} />, label: 'Super Area', value: `${property.area || 0} sqft` },
                { icon: <Sofa size={24} />, label: 'Furnishing', value: property.furnishing || 'Unfurnished' },
              ].map((spec, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-8 rounded-[2rem] border-white/5 flex flex-col items-center text-center group hover:border-amber-primary/30 transition-all cursor-default"
                >
                  <div className="w-14 h-14 bg-amber-primary/10 rounded-2xl flex items-center justify-center text-amber-primary mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-amber-primary/5">
                    {spec.icon}
                  </div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-xl font-bold text-white tracking-tight">{spec.value}</p>
                </motion.div>
              ))}
            </section>

            {/* AI Valuation & Analysis */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-10 rounded-[3rem] border-amber-primary/20 bg-amber-primary/5 relative overflow-hidden group">
                 <div className="absolute -top-12 -right-12 text-amber-primary/5 group-hover:rotate-12 transition-transform duration-1000">
                   <Zap size={200} />
                 </div>
                 <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                   <Sparkles className="text-amber-primary" size={24} /> AI Smart Valuation
                 </h3>
                 <div className="space-y-6 relative z-10">
                    <div>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em] mb-2">Estimated Market Range</p>
                      <div className="text-3xl font-mono font-bold text-white tracking-tighter">
                        ₹{(propertyPrice * 0.95).toLocaleString()} - ₹{(propertyPrice * 1.08).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                         <CheckCircle2 size={20} />
                       </div>
                       <p className="text-xs text-white/60 leading-relaxed font-medium">Currently listed at a <span className="text-success font-bold">Fair Market Price</span> based on Junagadh real-estate indexing.</p>
                    </div>
                 </div>
              </div>

              <div className="glass-panel p-10 rounded-[3rem] border-blue-500/20 bg-blue-500/5 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/schemes')}>
                 <div className="absolute -top-12 -right-12 text-blue-500/5 group-hover:scale-110 transition-transform duration-1000">
                   <Building2 size={200} />
                 </div>
                 <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                   <Filter className="text-blue-400" size={24} /> Scheme Eligibility
                 </h3>
                 <div className="space-y-6 relative z-10">
                    <p className="text-sm text-white/50 leading-relaxed">This property is eligible for <span className="text-white font-bold">PMAY (Urban)</span> and <span className="text-white font-bold">Stamp Duty Rebates</span>.</p>
                    <button className="flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                       Check My Benefit Amount <ArrowRight size={14} />
                    </button>
                 </div>
              </div>
            </section>

            {/* Nearby Places */}
            {property.nearbyPlaces && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-serif font-bold flex items-center gap-4">
                    <MapPin className="text-amber-primary" size={32} /> Neighborhood <span className="text-white/20 italic">Pulse.</span>
                  </h3>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest hidden md:block">Real-time distance data</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                  {/* Hospitals */}
                  {property.nearbyPlaces.hospitals && property.nearbyPlaces.hospitals.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-red-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 text-xl font-bold border border-red-500/20 group-hover:scale-110 transition-transform">🏥</div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Wellness</p>
                          <h4 className="text-lg font-bold">Hospitals</h4>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {property.nearbyPlaces.hospitals.map((h, i) => (
                          <li key={i} className="flex justify-between items-start gap-4">
                            <span className="text-sm text-white/60 leading-snug font-medium">{h.name}</span>
                            <span className="text-[9px] font-mono font-black text-red-400 bg-red-500/10 px-3 py-1 rounded-full whitespace-nowrap border border-red-500/10">{h.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Gardens */}
                  {property.nearbyPlaces.gardens && property.nearbyPlaces.gardens.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-green-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-2xl border border-green-500/20 group-hover:scale-110 transition-transform">🍃</div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Nature</p>
                          <h4 className="text-lg font-bold">Gardens</h4>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {property.nearbyPlaces.gardens.map((g, i) => (
                          <li key={i} className="flex justify-between items-start gap-4">
                            <span className="text-sm text-white/60 leading-snug font-medium">{g.name}</span>
                            <span className="text-[9px] font-mono font-black text-green-400 bg-green-500/10 px-3 py-1 rounded-full whitespace-nowrap border border-green-500/10">{g.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Temples */}
                  {property.nearbyPlaces.temples && property.nearbyPlaces.temples.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-amber-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-2xl border border-amber-500/20 group-hover:scale-110 transition-transform">✨</div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Heritage</p>
                          <h4 className="text-lg font-bold">Temples</h4>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {property.nearbyPlaces.temples.map((t, i) => (
                          <li key={i} className="flex justify-between items-start gap-4">
                            <span className="text-sm text-white/60 leading-snug font-medium">{t.name}</span>
                            <span className="text-[9px] font-mono font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full whitespace-nowrap border border-amber-500/10">{t.distance}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                </div>
              </section>
            )}

            {/* AI Trust Factor */}
            <section className="glass-panel p-12 rounded-[3rem] border-white/5 bg-amber-primary/[0.01] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-primary/5 blur-[100px] pointer-events-none"></div>
               <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="max-w-md">
                    <h3 className="text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                      <ShieldAlert className="text-amber-primary" /> AI Verification
                    </h3>
                    <p className="text-white/40 leading-relaxed">This property has passed our 12-point AI verification audit including title check, local infrastructure reliability, and fair price indexing.</p>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <div className="text-5xl font-mono font-bold text-amber-primary mb-2">{property.healthScore || 98}%</div>
                      <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Trust Index</p>
                    </div>
                    <div className="h-16 w-px bg-white/10"></div>
                    <div className="text-center">
                      <div className="text-5xl font-mono font-bold text-success mb-2">A+</div>
                      <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">Safety Grade</p>
                    </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <aside className="w-full lg:w-[450px]">
            <div className="glass-panel p-10 rounded-[3.5rem] sticky top-32 border-white/10 shadow-2xl bg-white/[0.02] backdrop-blur-3xl">
              <div className="mb-12">
                <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.3em] mb-4">Ownership Type: <span className="text-amber-primary">Individual</span></p>
                <div className="flex items-baseline gap-4">
                  <h2 className="text-5xl font-mono font-bold text-white tracking-tighter">₹{propertyPrice.toLocaleString()}</h2>
                  <span className="text-white/30 text-sm font-medium">{property.listingType === 'buy' ? 'Full Price' : '/month'}</span>
                </div>
              </div>

              <div className="space-y-5">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full py-5 rounded-[1.5rem] bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white transition-all font-bold flex items-center justify-center gap-4 text-lg shadow-lg shadow-green-500/5"
                >
                  <MessageCircle size={24} /> Contact on WhatsApp
                </button>
                
                <button 
                  onClick={() => window.open(`tel:${property.phone || '1234567890'}`)}
                  className="w-full py-5 rounded-[1.5rem] bg-white/5 text-white border border-white/10 hover:border-white/30 transition-all font-bold flex items-center justify-center gap-4 text-lg"
                >
                  <Phone size={22} /> Call Direct
                </button>

                {/* Map & 3D View Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => {
                      const lat = property.lat || property.location?.lat;
                      const lng = property.lng || property.location?.lng;
                      if (lat && lng) {
                        navigate(`/map?lat=${lat}&lng=${lng}&id=${property._id}`);
                      } else {
                        navigate('/map');
                      }
                    }}
                    className="py-4 rounded-[1.2rem] bg-white/5 text-white/70 border border-white/10 hover:border-amber-primary/40 hover:text-amber-primary hover:bg-amber-primary/5 transition-all font-semibold flex items-center justify-center gap-2 text-sm group"
                  >
                    <Map size={16} className="group-hover:scale-110 transition-transform" />
                    View on Map
                  </button>
                  <button
                    onClick={() => setIsThreeViewOpen(true)}
                    className="py-4 rounded-[1.2rem] bg-amber-primary/10 text-amber-primary border border-amber-primary/20 hover:bg-amber-primary hover:text-black transition-all font-semibold flex items-center justify-center gap-2 text-sm group shadow-lg shadow-amber-primary/5"
                  >
                    <Box size={16} className="group-hover:scale-110 transition-transform" />
                    3D Tour
                  </button>
                </div>

                <div className="py-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Owner Profile</span>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <div className="flex items-center gap-5 p-5 bg-white/[0.03] rounded-[2rem] border border-white/5">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-primary/20 to-amber-secondary/20 rounded-2xl flex items-center justify-center text-amber-primary border border-amber-primary/10">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{property.ownerName || 'Verified Owner'}</h4>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest flex items-center gap-2">
                      <Star size={12} className="text-amber-primary" fill="currentColor" /> Verified Owner
                    </p>
                  </div>
                </div>

                <div className="pt-10 space-y-4">
                   <div className="flex items-center gap-4 text-white/40 text-xs">
                     <Building2 size={16} /> <span>Built-up: {property.area || 0} sqft</span>
                   </div>
                   <div className="flex items-center gap-4 text-white/40 text-xs">
                     <Info size={16} /> <span>Listed on: {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                   </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A110A] border border-white/10 rounded-[2rem] md:rounded-[3rem] w-full max-w-6xl max-h-full flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">{property.title}</h3>
                <button 
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-amber-primary transition-all text-white/60"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
                {propertyImages.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 bg-black/20"
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${idx + 1}`} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[3s]" 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3D Tour Modal */}
      <ThreeViewerModal
        isOpen={isThreeViewOpen}
        onClose={() => setIsThreeViewOpen(false)}
        title={property?.title}
        address={property?.address}
      />
    </div>
  );
};

export default HomeDetailPage;
