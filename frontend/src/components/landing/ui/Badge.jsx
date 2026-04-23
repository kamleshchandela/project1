import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, glow = false }) => {
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-sm font-medium ${glow ? 'shadow-[0_0_15px_rgba(245,166,35,0.3)]' : ''}`}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
