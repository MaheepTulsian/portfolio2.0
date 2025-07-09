import React from 'react';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone, IconDownload, IconAward } from '@tabler/icons-react';
import BackgroundBeams from './BackgroundBeams';
import GlassCard from './GlassCard';
import mw from '../assets/mw.png';
import resume from '../assets/MaheepTulsian.pdf'

const Hero: React.FC = () => {
  const socialLinks = [
    { icon: IconBrandGithub, href: "https://github.com/MaheepTulsian", label: "GitHub" },
    { icon: IconBrandLinkedin, href: "https://linkedin.com/in/maheeptulsian", label: "LinkedIn" },
    { icon: IconMail, href: "mailto:maheep2403@gmail.com", label: "Email" },
    { icon: IconPhone, href: "tel:+919307775556", label: "Phone" }
  ];

  return (
    <section id="about" className="min-h-screen relative flex items-center justify-center px-6 pt-20">
      <BackgroundBeams />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available for opportunities</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4">
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                  Maheep
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-300 font-medium">
                Full Stack Developer
              </p>
            </motion.div>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-dark-400 mb-8 max-w-lg leading-relaxed"
            >
              Building scalable applications with clean code, AI agents, and secure systems.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <IconMail size={20} className="mr-2" />
                Get in Touch
              </motion.a>
              
              <motion.a
                href={resume}
                download="MaheepTulsian_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              >
                <IconDownload size={20} className="mr-2" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Profile Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative space-y-6"
          >
            {/* Main Profile Card */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1">Maheep Tulsian</h3>
                  <p className="text-dark-400">India</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-blue rounded-full flex items-center justify-center shadow-lg">
                  <img 
                    src={mw} 
                    alt="Maheep Tulsian" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-dark-300">💻 FULL STACK DEVELOPER</span>
                </div>
                <p className="text-accent-purple font-semibold">Available for Projects</p>
              </div>
              
              <div className="space-y-2 text-sm text-dark-400">
                <p className="flex items-center">
                  <IconMail size={16} className="mr-2" />
                  maheep2403@gmail.com
                </p>
                <p className="flex items-center">
                  <IconPhone size={16} className="mr-2" />
                  +91 9307775556
                </p>
              </div>
            </GlassCard>
            
            {/* Achievement Card */}
            <GlassCard className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <IconAward className="text-yellow-400" size={20} />
                <h4 className="text-white font-semibold">Recent Achievement</h4>
              </div>
              <p className="text-dark-300 text-sm mb-2">🏆 Winner @ Unfold'24</p>
              <p className="text-dark-400 text-xs">Coinbase Track - SMS Protocol</p>
            </GlassCard>
            
            {/* Education Card */}
            <GlassCard className="p-6">
              <h4 className="text-white font-semibold mb-3">Education</h4>
              <div className="space-y-2 text-sm">
                <p className="text-dark-300 font-medium">SRM University, AP</p>
                <p className="text-dark-400">B.Tech CSE (2022-2026)</p>
                <p className="text-accent-purple text-xs">CGPA: 8.9 | 25% Merit Scholarship</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;