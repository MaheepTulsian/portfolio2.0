import React from 'react';
import { motion } from 'framer-motion';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'purple' 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative group ${className}`}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor}-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}></div>
      <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-lg">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard;