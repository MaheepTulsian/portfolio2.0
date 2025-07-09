import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative group
        bg-white/5 backdrop-blur-sm
        border border-white/10
        rounded-xl
        shadow-xl shadow-black/20
        hover:shadow-2xl hover:shadow-accent-purple/10
        transition-all duration-300
        ${className}
      `}
    >
      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;