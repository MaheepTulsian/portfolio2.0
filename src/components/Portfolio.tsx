import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Up.ly - URL Shortener",
      category: "FULL STACK",
      type: "WEB APP",
      year: "2021",
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "PERSONAL PROJECT",
      link: "https://github.com/MaheepTulsian/up.ly"
    },
    {
      title: "BorrowBridge 2.0",
      category: "FULL STACK",
      type: "WEB DEV",
      year: "2022",
      image: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "LENDING PLATFORM",
      link: "https://github.com/MaheepTulsian/borrowbridge2.0"
    },
    {
      title: "Drug Inventory System",
      category: "BLOCKCHAIN",
      type: "SUPPLY CHAIN",
      year: "2023",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "HEALTHCARE SOLUTION",
      link: "https://github.com/MaheepTulsian/Drug-inventory-and-supply-chain"
    }
  ];

  return (
    <section id="work" className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Selected<br />work
          </h2>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
            See All
          </button>
        </div>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{project.year}</span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition-colors font-medium">
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;