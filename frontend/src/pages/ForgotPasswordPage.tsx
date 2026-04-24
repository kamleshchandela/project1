import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, Lock, RotateCcw, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import OtpInput from 'react-otp-input';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('OTP sent to your email');
      setStep(2);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { email, otp });
      toast.success('OTP verified');
      setStep(3);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, password });
      toast.success('Password updated successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0905] flex flex-col items-center justify-center p-6 selection:bg-amber-primary/30">
      {/* Header */}
      <div className="fixed top-0 w-full p-8 flex items-center justify-center">
         <button onClick={() => navigate(-1)} className="absolute left-10 p-2 text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={24} />
         </button>
         <h1 className="text-xl font-bold tracking-tight text-white/90">Account Recovery</h1>
      </div>

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.02]"
            >
              <div className="flex justify-between items-center mb-10">
                 <span className="text-[10px] text-amber-primary font-black uppercase tracking-[0.3em]">Step 1 of 3</span>
                 <div className="flex gap-1.5">
                    <div className="w-8 h-1.5 rounded-full bg-amber-primary"></div>
                    <div className="w-8 h-1.5 rounded-full bg-white/5"></div>
                    <div className="w-8 h-1.5 rounded-full bg-white/5"></div>
                 </div>
              </div>

              <div className="mb-10">
                <div className="w-16 h-16 bg-amber-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-primary/20">
                   <RotateCcw className="text-amber-primary" />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4">Forgot Password?</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Enter the email address associated with your account and we'll send you a One-Time Password to reset it.
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-amber w-full py-5 rounded-2xl text-base font-bold shadow-amber-glow-strong flex items-center justify-center gap-3"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                  {!loading && <ArrowRight size={18} />}
                </button>

                <button 
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full text-center text-white/40 hover:text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                   <ArrowLeft size={16} /> Return to Log In
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.02]"
            >
              <div className="flex justify-between items-center mb-10">
                 <span className="text-[10px] text-amber-primary font-black uppercase tracking-[0.3em]">Step 2 of 3</span>
                 <div className="flex gap-1.5">
                    <div className="w-8 h-1.5 rounded-full bg-amber-primary/40"></div>
                    <div className="w-8 h-1.5 rounded-full bg-amber-primary"></div>
                    <div className="w-8 h-1.5 rounded-full bg-white/5"></div>
                 </div>
              </div>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-bold mb-4">Verify It's You</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  We've sent a 6-digit code to <br /><span className="text-white/60 font-bold">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-10">
                <div className="flex justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: '3.5rem',
                      height: '4.5rem',
                      margin: '0 0.4rem',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      borderRadius: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      color: 'white',
                      outline: 'none',
                    }}
                    focusStyle={{
                      border: '1px solid #F2C36B',
                      boxShadow: '0 0 15px rgba(242, 195, 107, 0.2)',
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading || otp.length < 6}
                  className="btn-amber w-full py-5 rounded-2xl text-base font-bold shadow-amber-glow-strong flex items-center justify-center gap-3"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={handleSendOTP}
                    className="text-white/30 hover:text-white text-sm font-medium transition-colors"
                  >
                    Didn't receive the code? <span className="text-amber-primary font-bold">Resend Code</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.02]"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-serif font-bold mb-4">Secure Your Account</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Create a strong, unique password to complete your account recovery.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">New Password</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter new password"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-5 flex items-center text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                  <div className="relative group">
                    <RotateCcw size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-primary transition-colors" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Re-enter password"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-amber-primary/40 transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-amber w-full py-5 rounded-2xl text-base font-bold shadow-amber-glow-strong flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                  {!loading && <CheckCircle2 size={18} />}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-20 text-center">
           <p className="text-[10px] text-white/20 font-medium">
             © 2024 HomeTruth AI. All rights reserved. <br />
             <span className="inline-block mt-2">Privacy Policy &nbsp;•&nbsp; Terms of Service &nbsp;•&nbsp; Support</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
