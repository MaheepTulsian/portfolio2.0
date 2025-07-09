import React from 'react';

const Mission: React.FC = () => {
  return (
    <section className="bg-teal-500 text-white py-16 px-4 md:px-8 rounded-3xl mx-4 md:mx-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12">
          My mission is to build innovative web applications that solve real-world problems and create meaningful user experiences through clean, efficient code.
        </h2>
        
        <div className="flex flex-wrap items-center gap-8 opacity-80">
          <div className="text-2xl font-bold">React</div>
          <div className="text-2xl font-bold">Node.js</div>
          <div className="text-2xl font-bold">Python</div>
          <div className="text-2xl font-bold">MongoDB</div>
          <div className="text-2xl font-bold">PostgreSQL</div>
          <div className="text-2xl font-bold">AWS</div>
        </div>
      </div>
    </section>
  );
};

export default Mission;