import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Hand } from 'lucide-react';
import splashBg from '../assets/splash_bg.png';

const SplashScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 4000); // 4 seconds for a premium feel

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Image with Blur and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: `url(${splashBg})`,
          filter: 'blur(8px) brightness(0.4)'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo Icon - Hand holding Home concept */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="w-24 h-24 bg-amber-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(245,166,35,0.3)] relative"
        >
          <div className="relative flex items-center justify-center">
            <Home className="w-10 h-10 text-[#2D1B0D] z-10" />
            <div className="absolute -bottom-1 w-12 h-4 bg-[#2D1B0D]/20 blur-sm rounded-full" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-7xl font-bold text-amber-primary mb-2 tracking-tight"
          style={{ 
            fontFamily: 'var(--font-sans)',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          HomeTruth AI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-16 font-light tracking-wide"
        >
          Know Your Home's True Value
        </motion.p>


        {/* Loading Indicator */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-amber-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-amber-primary/80 uppercase"
          >
            INITIALIZING INSIGHTS
          </motion.span>
        </div>
      </div>

      {/* Decorative radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </motion.div>

  );
};

export default SplashScreen;
