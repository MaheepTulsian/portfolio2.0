import React from 'react';
import { motion } from 'framer-motion';
import { IconExternalLink, IconBrandGithub, IconAward } from '@tabler/icons-react';
import uply from '../assets/uply.png';
import borrowbridge from '../assets/borrowbridge.png';
import sms from '../assets/sms.png';
import ashwini from '../assets/ashwini.png';
import vibeui from '../assets/vibeui.png'

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Up.ly – AI-powered Career Assistant",
      description: "AI-generated resumes, mock interviews, DSA/core CS prep, and Chrome autofill.",
      image: uply,
      technologies: ["LangChain", "React", "Python"],
      github: "https://github.com/MaheepTulsian/up.ly",
      live: "",
      category: "AI/LLM",
      isWinner: false
    },
    {
      title: "BorrowBridge – Blockchain Crowdfunding",
      description: "Secure fundraising via Ethereum smart contracts and ThirdWeb.",
      image: borrowbridge,
      technologies: ["Solidity", "React", "ThirdWeb"],
      github: "https://github.com/MaheepTulsian/borrowbridge2.0",
      live: "",
      category: "Blockchain",
      isWinner: false
    },
    {
      title: "SMS Protocol – Crypto Without Internet",
      description: "Winner @ Unfold'24 (Coinbase Track); enables crypto over SMS using MPC.",
      image: sms,
      technologies: ["FastAPI", "solidity", "Twilio", "Python"],
      github: "https://devfolio.co/projects/sms-protocol-1c87",
      live: "",
      category: "Hackathon Winner",
      isWinner: true
    },
    {
      title: "Ashwini – Drug Inventory Dashboard",
      description: "Tracks stock with real-time updates and visual dashboards.",
      image: ashwini,
      technologies: ["Express", "React", "Ola Maps"],
      github: "https://github.com/MaheepTulsian/Drug-inventory-and-supply-chain",
      live: "",
      category: "MERN",
      isWinner: false
    },
    {
      title: "VibeUI – AI-Powered Component Library",
      description: "Next-gen UI wizard for stunning, brand-matched components with AI-assisted customization.",
      image: vibeui,
      technologies: ["React", "Firebase", "NPM", "FastAPI", "PostgreSQL"],
      github: "https://github.com/yourusername/vibeui",
      live: "",
      category: "Hackathon Winner",
      isWinner: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="py-18 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Featured <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-dark-400 text-base max-w-xl mx-auto leading-relaxed">
            A showcase of my work, blending creativity with functionality
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-accent-purple/10 transition-all duration-300"
            >
              {project.isWinner && (
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                  <IconAward size={12} />
                  <span>Winner</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 bg-black/50 backdrop-blur-sm border border-white/20 rounded-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <IconBrandGithub size={12} />
                </motion.a>
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-7 h-7 bg-black/50 backdrop-blur-sm border border-white/20 rounded-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <IconExternalLink size={12} />
                  </motion.a>
                )}
              </div>

              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                  project.isWinner
                    ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                    : 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 text-accent-purple'
                }`}>
                  {project.category}
                </span>
                <h3 className="text-base font-display font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-dark-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/5 border border-white/10 text-dark-300 px-1.5 py-0.5 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-white/5 border border-white/10 text-dark-300 px-1.5 py-0.5 rounded text-xs font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
