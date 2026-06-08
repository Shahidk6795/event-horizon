import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type, onClose }) => {
  // Automatically close the toast after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-xl backdrop-blur-md border shadow-2xl ${
            type === 'error' 
              ? 'bg-red-950/40 border-red-500/30 text-red-200' 
              : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
          }`}
        >
          {/* Status Icon */}
          <span className="flex-shrink-0">
            {type === 'error' ? '⚠️' : '✅'}
          </span>
          
          <div className="text-sm font-medium tracking-wide">
            {message}
          </div>

          {/* Manual Close Button */}
          <button 
            onClick={onClose}
            className="ml-4 text-white/50 hover:text-white transition-colors"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;