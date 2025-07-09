import React from 'react';

const BackgroundBeams: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Subtle beam lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent-purple/20 to-transparent"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent-blue/20 to-transparent"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent"></div>
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent"></div>
    </div>
  );
};

export default BackgroundBeams;