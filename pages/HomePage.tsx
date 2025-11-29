import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';
import { usePortfolio } from '../App';

const HomePage: React.FC = () => {
  const { projects } = usePortfolio();
  const [currentSlide, setCurrentSlide] = useState(0);

  const HERO_SLIDES = [
    {
      id: 1,
      image: "/rsc/images/8fdb252c357c2de1066b1e4444df6da97469ec4ceda8813d8084bf45816e41a5.png",
      position: "center"
    },
    {
      id: 2,
      image: "/rsc/images/4509f351aa63776e26b2df74735b1a09-49f724a4-1000.jpg",
      position: "center"
    },
    {
      id: 3,
      image: "/rsc/images/Foto-95_copy-c2243c57.jpg",
      position: "center"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <section className="relative h-screen w-full overflow-hidden bg-stone-900">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              backgroundPosition: slide.position
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-black/20 z-20" /> 
        
        <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 lg:px-8 z-30 pointer-events-none">
           <button onClick={prevSlide} className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none">
             <ArrowLeft size={20} strokeWidth={1} className="md:w-8 md:h-8" />
           </button>
           <button onClick={nextSlide} className="pointer-events-auto p-2 md:p-4 text-white/50 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none">
             <ArrowRight size={20} strokeWidth={1} className="md:w-8 md:h-8" />
           </button>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center z-30 pointer-events-none">
           <div className="flex items-center space-x-4 md:space-x-6 text-white tracking-[0.2em] font-serif text-[10px] md:text-xs">
             <span className={`transition-opacity duration-300 ${currentSlide === 0 ? 'opacity-100' : 'opacity-40'}`}>01</span>
             <span className={`transition-opacity duration-300 ${currentSlide === 1 ? 'opacity-100' : 'opacity-40'}`}>02</span>
             <span className={`transition-opacity duration-300 ${currentSlide === 2 ? 'opacity-100' : 'opacity-40'}`}>03</span>
           </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24 px-6 md:px-12 bg-stone-50">
        <div className="max-w-2xl mx-auto text-center space-y-4 md:space-y-6 lg:space-y-8 fade-in-up">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-serif text-stone-800">Hi, you've found us!</h2>
          <div className="w-8 md:w-10 lg:w-12 h-px bg-stone-300 mx-auto"></div>
          <p className="text-stone-600 text-[11px] md:text-xs lg:text-base leading-relaxed font-light">
            Across the vast expanse of space and the passage of time, our paths serendipitously intertwined, leading us to this moment. We are thrilled that our work has captivated your attention.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-6 lg:px-12 pb-12 md:pb-16 lg:pb-24 bg-stone-50">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-8 max-w-7xl mx-auto">
          {projects.slice(0, 6).map((project) => (
             <Link key={project.id} to={`/project/${project.id}`} className="group cursor-pointer block">
               <div className="relative overflow-hidden aspect-square bg-stone-200">
                 <img 
                   src={project.coverImage} 
                   alt={project.title} 
                   className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-2 md:p-4">
                    <span className="font-serif text-sm md:text-xl lg:text-2xl mb-1 md:mb-2 drop-shadow-md">{project.category}</span>
                    <span className="text-[7px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-90 drop-shadow-sm">{project.couple}</span>
                    <ArrowRight className="mt-1 md:mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" size={10} />
                 </div>
               </div>
             </Link>
          ))}
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/rsc/images/foto-323-9e1e1626.jpg')` }}
        />
        <div className="absolute inset-0 bg-stone-900/40" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-xl mx-auto space-y-3 md:space-y-4 lg:space-y-6">
          <h2 className="text-xl md:text-3xl lg:text-5xl font-serif">We'll see you soon</h2>
          <div className="w-full h-px bg-white/30 my-3 md:my-4 lg:my-6"></div>
          <p className="text-[11px] md:text-xs lg:text-base font-light opacity-90 leading-relaxed">
            Thank you for investing your time in exploring our gallery. It has been an incredible journey, filled with countless blessings.
          </p>
          <div className="pt-4 md:pt-6 lg:pt-8">
            <Link to="/contact" className="inline-block bg-[#c9bba6] text-white px-5 py-2 md:px-8 md:py-3 text-[9px] md:text-[10px] lg:text-xs tracking-widest uppercase hover:bg-[#b8aa95] transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 lg:py-24 bg-stone-50 text-center">
        <Instagram className="mx-auto mb-2 md:mb-3 lg:mb-4 text-stone-800" size={18} />
        <h3 className="font-serif text-sm md:text-base lg:text-xl mb-1 md:mb-2">Follow our Instagram</h3>
        <a href="#" className="text-[9px] md:text-[10px] lg:text-xs tracking-widest uppercase text-stone-500 hover:text-stone-800">@venapictures</a>
      </section>
    </div>
  );
};

export default HomePage;
