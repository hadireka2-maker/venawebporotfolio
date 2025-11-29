import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../App';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = usePortfolio();
  const project = projects.find(p => p.id === id);

  if (!project) return <div className="pt-32 text-center">Project not found</div>;

  return (
    <div className="w-full bg-stone-50">
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] w-full overflow-hidden">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white text-center space-y-3 md:space-y-4 px-6">
           <h1 className="text-2xl md:text-4xl lg:text-6xl font-serif">{project.couple}</h1>
           <p className="text-[10px] md:text-xs uppercase tracking-widest">{project.location} — {project.date}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 py-16 md:py-24 space-y-8 md:space-y-12 lg:space-y-24">
        {project.images.map((img, index) => (
          <div key={index} className="w-full fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <img src={img} alt={`Gallery ${index}`} className="w-full h-auto shadow-sm" loading="lazy" />
          </div>
        ))}
        
        <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-t border-stone-200">
          <Link to="/portfolio" className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 flex items-center gap-2">
            Back to Portfolio
          </Link>
          <Link to="/contact" className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 hover:text-stone-800 flex items-center gap-2">
            Inquire This Date <ArrowRight size={12} className="md:w-[14px] md:h-[14px]"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
