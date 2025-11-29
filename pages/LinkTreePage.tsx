import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '../App';
import { LinkBioTheme, LinkBioItem } from '../types';

const LinkTreePage: React.FC = () => {
  const { linkBioProfile, linkItems } = usePortfolio();
  const location = useLocation();
  
  // Get theme from query parameter or use profile theme
  const queryParams = new URLSearchParams(location.search);
  const previewTheme = queryParams.get('theme') as LinkBioTheme | null;
  const activeTheme = previewTheme || linkBioProfile.theme;
  
  const getThemeClasses = (theme: LinkBioTheme) => {
    switch (theme) {
      case 'classic':
        return {
          bg: 'bg-stone-50',
          bgImage: '',
          text: 'text-stone-800',
          card: 'bg-white/90 backdrop-blur-sm border border-stone-200 shadow-lg rounded-3xl p-8',
          button: 'bg-white border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white',
          accent: 'text-stone-500',
          avatar: 'border-4 border-stone-800 shadow-xl',
          overlay: ''
        };
      case 'soft':
        return {
          bg: 'bg-[#e8e6e1]',
          bgImage: '',
          text: 'text-[#5c554e]',
          card: 'bg-[#f5f4f1]/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8',
          button: 'bg-[#d6d3d1] text-[#44403c] hover:bg-[#c7c4c1] shadow-md border-none',
          accent: 'text-[#8a8580]',
          avatar: 'border-4 border-[#5c554e] shadow-xl',
          overlay: ''
        };
      case 'glass':
        return {
          bg: 'bg-stone-900',
          bgImage: 'bg-[url("/rsc/images/foto-323-9e1e1626.jpg")] bg-cover bg-center bg-fixed',
          text: 'text-white',
          card: 'backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8',
          button: 'backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white/20',
          accent: 'text-white/70',
          avatar: 'border-4 border-white/60 shadow-2xl',
          overlay: 'bg-black/50'
        };
      case 'gradient':
        return {
          bg: 'bg-stone-900',
          bgImage: 'bg-[url("/rsc/images/Photo-195-0fe055f6-1000.jpg")] bg-cover bg-center bg-fixed',
          text: 'text-white',
          card: 'backdrop-blur-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-400/20 border border-white/20 shadow-2xl rounded-3xl p-8',
          button: 'bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 shadow-xl',
          accent: 'text-white/80',
          avatar: 'border-4 border-white/70 shadow-2xl shadow-purple-500/50',
          overlay: 'bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-orange-900/60'
        };
      case 'neon':
        return {
          bg: 'bg-slate-950',
          bgImage: 'bg-[url("/rsc/images/Photo-82-7eba7822-1000.jpg")] bg-cover bg-center bg-fixed',
          text: 'text-cyan-400',
          card: 'backdrop-blur-xl bg-slate-900/80 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/30 rounded-3xl p-8',
          button: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 shadow-xl shadow-cyan-500/50 hover:shadow-cyan-400/80',
          accent: 'text-cyan-300',
          avatar: 'border-4 border-cyan-400 shadow-2xl shadow-cyan-500/60',
          overlay: 'bg-slate-950/70'
        };
      case 'minimal':
        return {
          bg: 'bg-white',
          bgImage: 'bg-[url("/rsc/images/Foto-95_copy-c2243c57.jpg")] bg-cover bg-center bg-fixed',
          text: 'text-gray-900',
          card: 'bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200',
          button: 'bg-gray-900 text-white hover:bg-gray-700 rounded-lg shadow-lg',
          accent: 'text-gray-500',
          avatar: 'border-2 border-gray-400 shadow-xl',
          overlay: 'bg-white/60'
        };
      case 'elegant':
        return {
          bg: 'bg-slate-900',
          bgImage: 'bg-[url("/rsc/images/Photo-121-30af12f8.jpeg")] bg-cover bg-center bg-fixed',
          text: 'text-amber-50',
          card: 'backdrop-blur-xl bg-slate-900/70 border-2 border-amber-200/20 shadow-2xl shadow-amber-500/20 rounded-3xl p-8',
          button: 'bg-gradient-to-r from-amber-200 to-yellow-200 text-slate-900 hover:from-amber-300 hover:to-yellow-300 border-none shadow-xl shadow-amber-500/30',
          accent: 'text-amber-200/70',
          avatar: 'border-4 border-amber-200/60 shadow-2xl shadow-amber-500/40',
          overlay: 'bg-gradient-to-b from-slate-900/80 to-slate-800/80'
        };
      case 'vibrant':
        return {
          bg: 'bg-blue-900',
          bgImage: 'bg-[url("/rsc/images/Photo-262-1b8cce7c.jpeg")] bg-cover bg-center bg-fixed',
          text: 'text-white',
          card: 'backdrop-blur-xl bg-white/10 border-2 border-white/30 shadow-2xl rounded-3xl p-8',
          button: 'bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-xl hover:shadow-2xl',
          accent: 'text-white/90',
          avatar: 'border-4 border-white shadow-2xl',
          overlay: 'bg-gradient-to-br from-blue-600/50 via-teal-500/50 to-green-500/50'
        };
      case 'dark':
      default:
        return {
          bg: 'bg-black',
          bgImage: '',
          text: 'text-white',
          card: 'bg-stone-900/90 backdrop-blur-sm border border-stone-800 shadow-2xl rounded-3xl p-8',
          button: 'bg-transparent border-2 border-white/40 text-white hover:border-white hover:bg-white/10',
          accent: 'text-stone-400',
          avatar: 'border-4 border-white/60 shadow-xl',
          overlay: ''
        };
    }
  };

  const theme = getThemeClasses(activeTheme);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 ${theme.bg} ${theme.bgImage} ${theme.text} relative overflow-hidden`}>
       {/* Background Overlay */}
       {theme.overlay && <div className={`absolute inset-0 ${theme.overlay} z-0`}></div>}
       
       {/* Main Content Container with Card */}
       <div className={`relative z-10 w-full max-w-lg mx-auto ${theme.card} animate-[fadeInUp_0.8s_ease-out]`}>
         
         {/* Profile Section */}
         <div className="flex flex-col items-center text-center space-y-4 md:space-y-5 mb-8">
           {/* Avatar with theme-specific styling */}
           <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ${theme.avatar} p-1`}>
             <img 
               src={linkBioProfile.avatar} 
               alt={linkBioProfile.name} 
               className="w-full h-full object-cover rounded-full" 
             />
           </div>
           
           {/* Name & Bio */}
           <div className="space-y-2">
             <h1 className="text-xl md:text-3xl font-bold tracking-wider uppercase">
               {linkBioProfile.name}
             </h1>
             <p className={`text-sm md:text-base font-light tracking-wide ${theme.accent}`}>
               {linkBioProfile.bio}
             </p>
           </div>
         </div>

         {/* Links Section */}
         <div className="w-full space-y-3 md:space-y-4">
           {linkItems.filter((item: LinkBioItem) => item.active).map((item: LinkBioItem) => (
             <a 
               key={item.id} 
               href={item.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className={`
                 group block w-full py-4 md:py-4.5 px-6 text-center 
                 text-sm md:text-base font-medium tracking-wide
                 transition-all duration-300 
                 ${activeTheme === 'minimal' ? 'rounded-lg' : 'rounded-full'}
                 ${theme.button}
                 transform hover:scale-[1.02] active:scale-[0.98]
               `}
             >
               <div className="flex items-center justify-center gap-3 relative">
                 <span className="flex-1 text-center">{item.label}</span>
                 <ExternalLink 
                   size={16} 
                   className="opacity-40 group-hover:opacity-80 transition-opacity absolute right-0" 
                 />
               </div>
             </a>
           ))}
         </div>

         {/* Footer */}
         <div className="pt-8 text-center">
           <Link 
             to="/" 
             className={`text-xs md:text-sm tracking-wider opacity-50 hover:opacity-100 transition-opacity ${theme.text}`}
           >
             VenaPictures Studio
           </Link>
         </div>

       </div>
    </div>
  );
};

export default LinkTreePage;
