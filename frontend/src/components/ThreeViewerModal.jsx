import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import ThreeViewer from './ThreeViewer';

const ThreeViewerModal = ({ isOpen, onClose, title, address }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-critical/80 backdrop-blur-md rounded-full text-white transition-colors border border-white/20 shadow-2xl group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            {/* Title Overlay */}
            {(title || address) && (
              <div className="absolute top-6 left-6 z-[110] bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
                {title && <h2 className="text-white font-serif text-xl font-bold">{title}</h2>}
                {address && (
                  <p className="text-gray-300 text-sm flex items-center gap-1">
                    <MapPin size={12} /> {address}
                  </p>
                )}
                <p className="text-amber-primary text-xs font-bold mt-1 tracking-wider uppercase">Interactive 3D Tour</p>
              </div>
            )}

            {/* Controls Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-2xl text-xs text-gray-300 flex gap-6 pointer-events-none">
              <span>🖱️ Drag to rotate</span>
              <span>📜 Scroll to zoom</span>
            </div>

            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <ThreeViewer />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThreeViewerModal;
