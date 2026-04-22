import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Home, ArrowRight, Zap, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Animated Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-primary/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse delay-700"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold leading-tight"
            >
              Find the Truth. <br />
              <span className="text-amber-primary">Before You Move In.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 font-light max-w-lg"
            >
              AI-powered home intelligence revealing hidden costs, risks, and government benefits for every property.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/explore" className="btn-amber text-lg px-8 py-4 flex items-center justify-center gap-2">
                Explore Homes <ArrowRight size={20} />
              </Link>
              <Link to="/virtual-tours" className="btn-glass text-lg px-8 py-4 flex items-center justify-center gap-2">
                View 3D Tours <Zap size={20} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[600px] w-full rounded-[2rem] overflow-hidden glass-card p-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury Home" 
              className="w-full h-full object-cover rounded-[1.5rem]"
            />
            {/* Overlay card */}
            <div className="absolute bottom-10 left-[-30px] glass-card p-4 rounded-xl flex items-center gap-4 animate-bounce duration-3000">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <ShieldCheck className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">AI Risk Score</p>
                <p className="font-bold text-lg text-white">98/100 Safe</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 px-4 bg-dark-secondary/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Homes Analyzed', value: '12,450+', icon: <Home className="text-amber-primary" /> },
            { label: 'Risk Score Found', value: '98/100', icon: <ShieldCheck className="text-critical" /> },
            { label: 'Benefits Unlocked', value: '₹4.2 Cr', icon: <Zap className="text-success" /> },
            { label: 'Service Bookings', value: '8,900+', icon: <Zap className="text-blue-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-mono font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default LandingPage;
