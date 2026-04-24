import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User as UserIcon, Mail, Phone, MapPin, Lock, ArrowRight, Eye, EyeOff, Camera } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { setCredentials } from '../store/slices/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    serviceCategory: '',
    experience: '',
    jobsCompleted: '',
    baseFee: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    if (!avatar) {
      return toast.error('Please upload a profile photo');
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register', { 
        ...formData, 
        role,
        avatar
      });
      const { token, data } = response.data;
      dispatch(setCredentials({ user: data.user, token }));
      toast.success(role === 'user' ? 'Welcome to HomeTruth!' : 'Partner application received!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google-login', { 
        idToken: credentialResponse.credential 
      });
      const { token, data } = response.data;
      dispatch(setCredentials({ user: data.user, token }));
      toast.success('Signed in with Google');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0905] flex overflow-hidden selection:bg-amber-primary/30">
      {/* Left Side: Brand Story & Impact */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#1A120B]">
        <img 
          src="/images/auth-bg.png" 
          alt="Premium Architecture" 
          className="w-full h-full object-cover opacity-60 scale-110 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0905] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#0F0905] via-transparent to-transparent"></div>
        
        <div className="absolute top-[10%] left-24 right-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-primary/10 border border-amber-primary/20 text-amber-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">Exclusive Membership</span>
            <h2 className="text-6xl font-serif font-bold text-white mb-10 leading-tight">Start Your <br /><span className="text-gradient">Legacy.</span></h2>
            <div className="flex gap-12 border-t border-white/5 pt-10">
              <div>
                <p className="text-3xl font-serif font-bold text-white mb-2">50k+</p>
                <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Premium Assets</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-white mb-2">100%</p>
                <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Assurance</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-white mb-2">0.1s</p>
                <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Audit Speed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto custom-scrollbar bg-[#0F0905] p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-5">
           <UserIcon size={150} className="text-amber-primary" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">Create Account</h1>
            <p className="text-white/40 text-sm font-medium">Join our ecosystem of residents and partners.</p>
          </div>

          {/* Social Signup */}
          <div className="mb-8">
            <div className="flex justify-center scale-90">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Sign In failed')}
                theme="dark"
                width="250"
                shape="pill"
                text="signup_with"
              />
            </div>
            <div className="flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-white/5"></div>
              <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">or fill manually</span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5 pb-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full border-2 border-white/5 bg-white/[0.03] overflow-hidden flex items-center justify-center transition-all group-hover:border-amber-primary/40">
                  {avatar ? (
                    <img src={avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={40} className="text-white/20 group-hover:text-amber-primary/40 transition-colors" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-amber-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform">
                  <Camera size={16} className="text-dark-bg" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAvatar(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
              <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mt-3">Upload Profile Photo</p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] ml-1">I am joining as a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-3 rounded-xl border-2 transition-all font-bold text-xs ${role === 'user' ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'}`}
                >
                  Resident
                </button>
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`py-3 rounded-xl border-2 transition-all font-bold text-xs ${role === 'provider' ? 'border-amber-primary bg-amber-primary/10 text-amber-primary shadow-amber-glow' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'}`}
                >
                  Partner
                </button>
              </div>
            </div>

            {/* Dynamic Section based on Role - Partner only */}
            <AnimatePresence mode="wait">
              {role === 'provider' && (
                <motion.div 
                  key="provider-cat"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] ml-1">Work Specialization</label>
                  <div className="relative group">
                    <select 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all appearance-none font-medium cursor-pointer hover:border-white/10"
                      style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff40' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'right 16px center' 
                      }}
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
                      required
                    >
                      <option value="" style={{background: '#1A110A', color: '#ffffff80'}}>Select Your Specialization</option>
                      <option value="All-Rounder" style={{background: '#1A110A', color: '#fff'}}>🛠️ All-Rounder (Multi-talented)</option>
                      <option value="Electrician" style={{background: '#1A110A', color: '#fff'}}>⚡ Electrician</option>
                      <option value="AC Repair" style={{background: '#1A110A', color: '#fff'}}>❄️ AC Repair</option>
                      <option value="Plumber" style={{background: '#1A110A', color: '#fff'}}>🪠 Plumbing</option>
                      <option value="Carpenter" style={{background: '#1A110A', color: '#fff'}}>🪚 Carpenter</option>
                      <option value="Painter" style={{background: '#1A110A', color: '#fff'}}>🎨 Painter</option>
                      <option value="Cleaning" style={{background: '#1A110A', color: '#fff'}}>🧹 Cleaning</option>
                      <option value="Pest Control" style={{background: '#1A110A', color: '#fff'}}>🐜 Pest Control</option>
                      <option value="Home Inspector" style={{background: '#1A110A', color: '#fff'}}>🔍 Home Inspector</option>
                      <option value="Legal" style={{background: '#1A110A', color: '#fff'}}>⚖️ Legal Specialist</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] ml-1">Experience (Years)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 5"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] ml-1">Jobs Completed</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 150"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                        value={formData.jobsCompleted}
                        onChange={(e) => setFormData({...formData, jobsCompleted: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] ml-1">Base Service Fee (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 500"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 px-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                      value={formData.baseFee}
                      onChange={(e) => setFormData({...formData, baseFee: e.target.value})}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Fields */}
            <div className="space-y-4">
              <div className="relative group">
                <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                <input 
                  type="tel" 
                  placeholder="WhatsApp Number"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-amber w-full py-4 rounded-xl text-sm font-bold shadow-amber-glow flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              {loading ? 'Processing...' : 'Create Account'}
              {!loading && <ArrowRight size={16} />}
            </button>

            <p className="text-center text-white/30 text-xs font-medium pt-2">
              Already have an account? <Link to="/login" title="Login" className="text-amber-primary hover:underline font-bold">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
