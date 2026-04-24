import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { setCredentials } from '../store/slices/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, data } = response.data;
      dispatch(setCredentials({ user: data.user, token }));
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
      toast.success('Logged in with Google');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0905] flex overflow-hidden">
      {/* Left Side: Cinematic Visuals (Desktop Only) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="/images/auth-bg.png" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F0905]"></div>
        <div className="absolute top-[10%] left-20 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-5xl font-serif font-bold text-white mb-6 leading-tight">Elevate Your Living <br /><span className="text-gradient">Experience.</span></h2>
            <div className="w-20 h-1 bg-amber-primary mb-8"></div>
            <p className="text-white/80 text-lg leading-relaxed font-medium">Discover properties that don't just meet your needs, but define your lifestyle.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-[#0F0905]">
        {/* Background Ambience */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-primary/5 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-sm relative z-10">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-amber-primary to-amber-secondary rounded-xl flex items-center justify-center shadow-amber-glow shrink-0">
              <span className="text-dark-bg font-serif font-black text-2xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-white mb-0.5">HomeTruth <span className="text-gradient">AI</span></h1>
              <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.2em]">Personalized Concierge</p>
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-2">Welcome Back</h2>
              <p className="text-white/40 text-sm font-medium">Please enter your details to access your account.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Email or Phone</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-amber-primary transition-colors">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-amber-primary/40 focus:bg-white/[0.05] transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">Password</label>
                  <Link to="/forgot-password" title="Recover account" className="text-[9px] text-amber-primary/60 hover:text-amber-primary font-black uppercase tracking-[0.1em] transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-amber-primary transition-colors">
                    <Lock size={16} />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-amber-primary/40 focus:bg-white/[0.05] transition-all font-medium"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="btn-amber w-full py-4 rounded-xl text-sm font-bold shadow-amber-glow flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-white/5"></div>
              <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">or social login</span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center scale-90 mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Sign In failed')}
                useOneTap
                theme="dark"
                width="250"
                shape="pill"
              />
            </div>

            {/* Footer Link */}
            <p className="mt-8 text-center text-white/30 text-xs font-medium">
              Don't have an account? <Link to="/signup" title="Create account" className="text-amber-primary hover:underline font-bold">Request Access</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
