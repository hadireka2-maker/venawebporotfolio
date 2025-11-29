import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../App';

const PortfolioPage: React.FC = () => {
  const { projects } = usePortfolio();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const PORTFOLIO_SLIDES = [
    '/rsc/images/Photo-108-500551e8.jpg',
    '/rsc/images/Photo-121-30af12f8.jpeg',
    '/rsc/images/Photo-195-0fe055f6-1000.jpg',
    '/rsc/images/Photo-262-1b8cce7c.jpeg',
    '/rsc/images/foto-323-9e1e1626.jpg',
    '/rsc/images/Foto-95_copy-c2243c57.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PORTFOLIO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="w-full bg-stone-50 min-h-screen">
      <div className="relative h-[35vh] md:h-[45vh] lg:h-[60vh] w-full overflow-hidden mb-8 md:mb-12 lg:mb-16">
        {PORTFOLIO_SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide} 
              alt={`Portfolio ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
           <div className="text-center space-y-3 md:space-y-4 lg:space-y-6 fade-in-up">
             <h1 className="text-2xl md:text-4xl lg:text-7xl font-serif text-white tracking-wide">Portfolio</h1>
             <div className="w-12 md:w-20 lg:w-24 h-px bg-white/60 mx-auto"></div>
             <p className="text-white/80 text-[9px] md:text-[10px] lg:text-sm tracking-[0.3em] uppercase">Captured Moments</p>
           </div>
        </div>
      </div>

       <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4 px-6">
         <div className="flex justify-center space-x-3 md:space-x-4 lg:space-x-6 text-[9px] md:text-[10px] lg:text-xs tracking-widest text-stone-500 uppercase">
           <span 
             onClick={() => setActiveFilter('All')}
             className={`cursor-pointer transition-colors ${activeFilter === 'All' ? 'text-stone-900 underline underline-offset-4 decoration-stone-300' : 'hover:text-stone-800'}`}
           >
             All
           </span>
           <span 
             onClick={() => setActiveFilter('Wedding')}
             className={`cursor-pointer transition-colors ${activeFilter === 'Wedding' ? 'text-stone-900 underline underline-offset-4 decoration-stone-300' : 'hover:text-stone-800'}`}
           >
             Wedding
           </span>
           <span 
             onClick={() => setActiveFilter('Couple')}
             className={`cursor-pointer transition-colors ${activeFilter === 'Couple' ? 'text-stone-900 underline underline-offset-4 decoration-stone-300' : 'hover:text-stone-800'}`}
           >
             Couple
           </span>
           <span 
             onClick={() => setActiveFilter('Engagement')}
             className={`cursor-pointer transition-colors ${activeFilter === 'Engagement' ? 'text-stone-900 underline underline-offset-4 decoration-stone-300' : 'hover:text-stone-800'}`}
           >
             Engagement
           </span>
         </div>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pb-12 md:pb-16 lg:pb-24">
          {filteredProjects.map((project) => (
             <Link key={project.id} to={`/project/${project.id}`} className="group cursor-pointer block fade-in-up">
               <div className="relative overflow-hidden aspect-square">
                 <img 
                   src={project.coverImage} 
                   alt={project.title} 
                   className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-2 md:p-4">
                    <span className="font-serif text-sm md:text-xl lg:text-2xl drop-shadow-md">{project.category}</span>
                    <div className="w-5 md:w-8 h-px bg-white/50 my-1 md:my-3 group-hover:bg-white group-hover:w-8 md:group-hover:w-12 transition-all duration-500"></div>
                    <div className="flex flex-col gap-0.5 md:gap-1 items-center transform transition-transform duration-500 group-hover:translate-y-0">
                      <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-medium drop-shadow-sm">{project.couple}</span>
                      <span className="text-[6px] md:text-[9px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-300">{project.date}</span>
                    </div>
                    <ArrowRight className="mt-1 md:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" size={10} />
                 </div>
               </div>
             </Link>
          ))}
        </div>
    </div>
  );
};

export default PortfolioPage;
