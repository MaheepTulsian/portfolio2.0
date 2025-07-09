import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages",
      description: "Core programming languages and syntax",
      skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Java"],
      icon: "💻"
    },
    {
      title: "Frontend",
      description: "User interface and client-side technologies",
      skills: ["React", "Next.js", "TailwindCSS", "Material UI", "Zustand", "Redux"],
      icon: "🎨"
    },
    {
      title: "Backend",
      description: "Server-side development and databases",
      skills: ["Node.js", "Express", "FastAPI", "Firebase", "PostgreSQL", "MongoDB"],
      icon: "⚙️"
    },
    {
      title: "Cloud & DevOps",
      description: "Cloud platforms and deployment tools",
      skills: ["AWS", "Azure", "GitHub Actions", "Docker"],
      icon: "☁️"
    },
    {
      title: "AI/LLMs",
      description: "Artificial Intelligence and Language Models",
      skills: ["LangChain", "RAG", "OpenAI/Groq/Gemini APIs", "Ollama"],
      icon: "🤖"
    },
    {
      title: "Blockchain",
      description: "Decentralized technologies and smart contracts",
      skills: ["Solidity", "Web3.js", "Ether.js", "ThirdWeb"],
      icon: "⛓️"
    },
    // {
    //   title: "Tools",
    //   description: "Development and productivity tools",
    //   skills: ["Git", "Postman", "VS Code"],
    //   icon: "🛠️"
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Skills & <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern applications with AI and blockchain
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-lg font-display font-bold text-white">{category.title}</h3>
                </div>
                <p className="text-dark-400 mb-4 text-sm leading-relaxed">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 text-accent-purple px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-sm hover:from-accent-purple/30 hover:to-accent-blue/30 transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;