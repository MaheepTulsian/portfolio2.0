import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import mw from '../assets/mw.png';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-950/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
            <img 
              src={mw} 
              alt="Maheep Tulsian" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="font-display font-semibold text-xl text-white">Maheep Tulsian</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              className="text-dark-300 hover:text-white transition-colors relative group font-medium"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-blue group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center px-6 py-2.5 bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Get in Touch
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-950/95 backdrop-blur-md border-t border-white/10 py-6"
        >
          <nav className="flex flex-col space-y-4 px-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-dark-300 hover:text-white transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="mailto:maheep2403@gmail.com"
              className="bg-gradient-to-r from-accent-purple to-accent-blue text-white px-6 py-2.5 rounded-lg font-medium w-fit mt-4"
            >
              Get in Touch
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;