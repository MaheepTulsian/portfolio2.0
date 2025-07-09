import React from 'react';
import { motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone } from '@tabler/icons-react';
import mw from '../assets/mw.png';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: IconBrandGithub, href: "https://github.com/MaheepTulsian", label: "GitHub" },
    { icon: IconBrandLinkedin, href: "https://linkedin.com/in/maheeptulsian", label: "LinkedIn" },
    { icon: IconMail, href: "mailto:maheep2403@gmail.com", label: "Email" },
    { icon: IconPhone, href: "tel:+919307775556", label: "Phone" }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-dark-950/50 border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center shadow-lg">
                <img
                  src={mw}
                  alt="Maheep Tulsian"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="font-display font-bold text-xl text-white">Maheep Tulsian</span>
            </div>
            <p className="text-dark-400 leading-relaxed">
              Full Stack Developer passionate about building scalable applications with clean code, 
              AI agents, and secure systems that make a difference.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-dark-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-lg text-white mb-6">Connect With Me</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-dark-400 text-sm">
              Let's build something amazing together!
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;