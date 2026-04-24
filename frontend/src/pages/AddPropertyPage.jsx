import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, MapPin, IndianRupee, Bed, Bath, Maximize, 
  User, Phone, MessageCircle, Mail, Camera, 
  CheckCircle2, ArrowRight, ArrowLeft, Loader2, Sparkles,
  Building2, Warehouse, Store, Sofa
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Apartment',
    listingType: 'buy',
    address: '',
    city: '',
    state: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnishing: 'Unfurnished',
    ownerName: '',
    phone: '',
    whatsapp: '',
    email: '',
    images: []
  });

  const propertyTypes = ['Apartment', 'House', 'Villa', 'PG', 'Commercial'];
  const furnishingTypes = ['Unfurnished', 'Semi', 'Fully'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = () => {
    // Simulated image upload for now (production would use Cloudinary/S3)
    const placeholderImages = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&w=800&q=80'
    ];
    
    if (formData.images.length < 10) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, placeholderImages[prev.images.length % 3]]
      }));
      toast.success('Image added (Demo Mode)');
    } else {
      toast.error('Maximum 10 images allowed');
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.title || !formData.address || !formData.city || !formData.state) {
        toast.error('Please fill all basic info');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.price || !formData.area) {
        toast.error('Price and Area are required');
        return false;
      }
    }
    if (step === 3) {
      if (!formData.ownerName || !formData.phone || !formData.whatsapp) {
        toast.error('Contact details are required');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length < 3) {
      return toast.error('Minimum 3 images required');
    }

    setLoading(true);
    try {
      await api.post('/properties', formData);
      toast.success('Property Listed Successfully!');
      navigate('/explore');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0905] pt-32 pb-20 px-6 selection:bg-amber-primary/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-primary/5 blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border-amber-primary/20 bg-amber-primary/5 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={12} /> List Your Asset
          </motion.div>
          <h1 className="text-5xl font-serif font-bold text-white mb-6">Property <span className="text-gradient italic">Submission.</span></h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-4 mt-12">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= num ? 'bg-amber-primary text-dark-bg shadow-amber-glow' : 'bg-white/5 text-white/20 border border-white/10'}`}>
                  {step > num ? <CheckCircle2 size={20} /> : num}
                </div>
                {num < 4 && <div className={`w-20 h-0.5 rounded-full transition-all duration-700 ${step > num ? 'bg-amber-primary shadow-amber-glow' : 'bg-white/5'}`}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-10 lg:p-16 rounded-[4rem] border-white/5 bg-white/[0.01] shadow-premium relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* STEP 1: BASIC INFO */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Property Title</label>
                    <div className="relative group">
                      <Home size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="title"
                        placeholder="e.g. Luxury 3BHK Penthouse"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Property Type</label>
                    <select 
                      name="propertyType"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 appearance-none font-medium"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                    >
                      {propertyTypes.map(t => <option key={t} value={t} className="bg-dark-bg">{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Listing Type</label>
                  <div className="flex p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 w-full lg:w-1/2">
                    {['buy', 'rent'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, listingType: type }))}
                        className={`relative flex-1 py-3 text-xs font-bold transition-all duration-300 rounded-xl ${formData.listingType === type ? 'text-dark-bg bg-amber-primary shadow-amber-glow' : 'text-white/40 hover:text-white'}`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Full Address</label>
                  <div className="relative group">
                    <MapPin size={18} className="absolute left-5 top-5 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <textarea 
                      name="address"
                      placeholder="Street address, locality, near landmark..."
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium h-32"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">City</label>
                    <input 
                      name="city"
                      placeholder="e.g. Ahmedabad"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">State</label>
                    <input 
                      name="state"
                      placeholder="e.g. Gujarat"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROPERTY DETAILS */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Expected Price (₹)</label>
                    <div className="relative group">
                      <IndianRupee size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="price"
                        type="number"
                        placeholder="e.g. 7500000"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Area (sq.ft)</label>
                    <div className="relative group">
                      <Maximize size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="area"
                        type="number"
                        placeholder="e.g. 1850"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Bedrooms</label>
                    <div className="relative group">
                      <Bed size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="bedrooms"
                        type="number"
                        placeholder="e.g. 3"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Bathrooms</label>
                    <div className="relative group">
                      <Bath size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="bathrooms"
                        type="number"
                        placeholder="e.g. 2"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Furnishing</label>
                    <select 
                      name="furnishing"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 appearance-none font-medium"
                      value={formData.furnishing}
                      onChange={handleInputChange}
                    >
                      {furnishingTypes.map(t => <option key={t} value={t} className="bg-dark-bg">{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT INFO */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Owner Full Name</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      name="ownerName"
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">WhatsApp Number</label>
                    <div className="relative group">
                      <MessageCircle size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                      <input 
                        name="whatsapp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Email Address (Optional)</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      name="email"
                      type="email"
                      placeholder="owner@example.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: MEDIA UPLOAD */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center p-12 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.01] hover:bg-white/[0.02] transition-all group">
                  <div className="w-20 h-20 bg-amber-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Camera className="text-amber-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload Property Images</h3>
                  <p className="text-white/30 text-sm mb-8">Min 3 and Max 10 high-quality photos required.</p>
                  <button 
                    type="button"
                    onClick={handleImageAdd}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all border border-white/10"
                  >
                    Select Files
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {formData.images.map((img, i) => (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={i} 
                      className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative group"
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                          className="p-2 bg-critical/20 text-critical rounded-lg hover:bg-critical hover:text-white transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between pt-10 border-t border-white/5">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex items-center gap-3 text-white/40 hover:text-white font-bold transition-all"
                >
                  <ArrowLeft size={20} /> Back
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="btn-amber !py-4 !px-10 flex items-center gap-3 shadow-amber-glow"
                >
                  Continue <ArrowRight size={20} />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-amber !py-4 !px-12 flex items-center gap-3 shadow-amber-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Listing Property...
                    </>
                  ) : (
                    <>
                      Finalize & List <ArrowRight size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
