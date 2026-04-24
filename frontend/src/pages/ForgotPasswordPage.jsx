import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, Lock, RotateCcw, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Get new password from backend
      const response = await api.post('/auth/recover-password', { email });
      const { tempPassword, fullName, phone, email: userEmail } = response.data.data;

      // 2. Send via EmailJS
      const templateParams = {
        to_name: fullName,
        to_email: userEmail,
        user_name: fullName,
        user_email: userEmail,
        user_phone: phone,
        message: `Hello ${fullName}, your account recovery details are:
        
Name: ${fullName}
Email: ${userEmail}
Phone: ${phone}
New Temporary Password: ${tempPassword}

Please use this password to log in and then change it in your settings.`,
        temp_password: tempPassword
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('New password sent to your email');
      setStep(2);
    } catch (error) {
      console.error('Recovery error:', error);
      toast.error(error.response?.data?.message || 'Failed to recover password');
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
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.02]"
            >
              <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-amber-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-primary/20 mx-auto">
                   <RotateCcw className="text-amber-primary" />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-4">Forgot Password?</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Enter your email and we'll send your new password directly to your inbox.
                </p>
              </div>

              <form onSubmit={handleRecoverPassword} className="space-y-8">
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
                  {loading ? 'Recovering...' : 'Send Password'}
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
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/[0.02] text-center"
            >
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-8 mx-auto border border-success/20">
                 <CheckCircle2 size={40} className="text-success" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Email Sent!</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-10">
                A new password has been sent to <br />
                <span className="text-white font-bold">{email}</span>. <br />
                Please check your inbox and use it to log in.
              </p>
              
              <button 
                onClick={() => navigate('/login')}
                className="btn-amber w-full py-5 rounded-2xl text-base font-bold shadow-amber-glow"
              >
                Go to Login
              </button>
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
