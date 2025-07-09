import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconMail, IconPhone, IconMapPin, IconSend, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import GlassCard from './GlassCard';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: IconMail,
      label: "Email",
      value: "maheep2403@gmail.com",
      href: "mailto:maheep2403@gmail.com"
    },
    {
      icon: IconPhone,
      label: "Phone",
      value: "+91 9307775556",
      href: "tel:+919307775556"
    },
    {
      icon: IconMapPin,
      label: "Location",
      value: "India",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: IconBrandGithub,
      label: "GitHub",
      href: "https://github.com/MaheepTulsian"
    },
    {
      icon: IconBrandLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/maheeptulsian"
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Get in <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-dark-400 mb-8 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a project in mind or just want to chat about technology, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 rounded-lg flex items-center justify-center">
                    <info.icon className="text-accent-purple" size={20} />
                  </div>
                  <div>
                    <p className="text-dark-400 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-display font-bold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-dark-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors backdrop-blur-sm"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors backdrop-blur-sm"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors resize-none backdrop-blur-sm"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-accent-purple to-accent-blue text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
                >
                  <IconSend size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;