import React from 'react';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-purple-600" />,
      title: "Frontend Development",
      number: "01",
      description: "Building responsive, interactive user interfaces using React, TypeScript, and modern CSS frameworks. Creating seamless user experiences with attention to performance and accessibility."
    },
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Backend Development",
      number: "02",
      description: "Developing robust server-side applications with Node.js, Python, and various databases. Building RESTful APIs and implementing secure authentication systems."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Full Stack Solutions",
      number: "03",
      description: "End-to-end web application development from concept to deployment. Integrating frontend and backend technologies to create complete, scalable solutions."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Mobile Development",
      number: "04",
      description: "Creating cross-platform mobile applications using React Native and modern mobile development frameworks for iOS and Android platforms."
    }
  ];

  return (
    <section id="services" className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              How Can I Assist You?
            </h2>
          </div>
          
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <span className="text-gray-400 text-lg font-light">{service.number}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;