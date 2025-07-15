import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import techsnap from '../assets/Techsnap.png';
import gdg from '../assets/gdg.png';
import ntl from '../assets/ntl.jpeg';
import srm from '../assets/srm.png';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Techsnap Educations LLP",
      role: "AI Research Intern",
      period: "Mar 2025 – May 2025",
      description: "Explored RAG, fine-tuned local LLMs using Ollama, deployed scalable agents.",
      technologies: ["RAG", "LLMs", "Ollama", "AI Agents","Multi-Model Agents"],
      icon: techsnap,
      current: false
    },
    {
      company: "GDG SRM AP",
      role: "Technical Coordinator",
      period: "Sep 2024 – Present", 
      description: "Founding member leading LLM workshops, live demos, and API projects.",
      technologies: ["LLMs", "Workshops", "Leadership"],
      icon: gdg,
      current: true
    },
    {
      company: "SRM University AP",
      role: "Full Stack Dev Intern",
      period: "Jun 2024 – Aug 2024",
      description: "Developed a student listing portal with advanced filters and export.",
      technologies: ["React", "Node.js", "Database", "Filters"],
      icon: srm,
      current: false
    },
    {
      company: "Norman Lab – Next Tech Lab",
      role: "Member",
      period: "Oct 2022 – Present",
      description: "Peer-reviewed research in full-stack systems and AI/ML.",
      technologies: ["Research", "Full Stack", "AI/ML", "Peer Review"],
      icon: ntl,
      current: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A timeline of my professional growth and learning experiences
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="p-8">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-white border border-accent-purple/30 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                    {typeof exp.icon === 'string' && exp.icon.startsWith('/') ? (
                      <img src={exp.icon} alt={exp.company} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span>{exp.icon}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">{exp.company}</h3>
                        <p className="text-accent-purple font-semibold">{exp.role}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <span className="text-dark-400 text-sm font-medium">{exp.period}</span>
                        {exp.current && (
                          <span className="bg-green-500/20 border border-green-500/30 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-dark-400 mb-4 leading-relaxed">{exp.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-white/5 border border-white/10 text-dark-300 px-3 py-1 rounded-lg text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">Education</h3>
          <GlassCard className="p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-white border border-accent-purple/30 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                <img src={srm} alt="SRM University" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">SRM University, AP</h3>
                    <p className="text-accent-purple font-semibold">B.Tech in Computer Science Engineering</p>
                  </div>
                  <span className="text-dark-400 text-sm font-medium mt-2 md:mt-0">2022 – 2026</span>
                </div>
                <div className="space-y-2">
                  <p className="text-dark-400 leading-relaxed">
                    Pursuing Bachelor's degree with focus on software development, AI/ML, and system design.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-lg text-xs font-medium">
                      CGPA: 8.9
                    </span>
                    <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 py-1 rounded-lg text-xs font-medium">
                      SGPA (6th Sem): 9.1
                    </span>
                    <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-lg text-xs font-medium">
                      25% Merit Scholarship
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;