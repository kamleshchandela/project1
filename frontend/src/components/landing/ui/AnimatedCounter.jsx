import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ target, label, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-xl border border-white/5 bg-white/5 flex flex-col items-center text-center hover:border-amber-500/30 transition-colors"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-mono font-bold text-white mb-1">
        {/* Placeholder for actual count up logic */}
        {target}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
