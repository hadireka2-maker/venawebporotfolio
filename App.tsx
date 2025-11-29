import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Menu, X, Instagram, ArrowRight, ArrowUp, ArrowLeft, Plus, Trash2, Edit2, LogOut, Save, LayoutDashboard, Image as ImageIcon, Link as LinkIcon, ExternalLink, User, Settings, Palette } from 'lucide-react';
import { Project, PORTFOLIO_DATA, LinkBioItem, LinkBioProfile, LinkBioTheme } from './types';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLinksManager from './pages/AdminLinksManager';
import AdminProjectForm from './pages/AdminProjectForm';

// Public Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LinkTreePage from './pages/LinkTreePage';

// --- ASSETS ---

const LOGO_LIGHT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60' fill='none'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' font-size='32' letter-spacing='0.1em' fill='white'%3EVenaPictures%3C/text%3E%3C/svg%3E";
const LOGO_DARK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60' fill='none'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' font-size='32' letter-spacing='0.1em' fill='%23292524'%3EVenaPictures%3C/text%3E%3C/svg%3E";

// --- CONTEXT ---

interface PortfolioContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  // Link Bio Types
  linkBioProfile: LinkBioProfile;
  updateLinkBioProfile: (profile: LinkBioProfile) => void;
  linkItems: LinkBioItem[];
  addLinkItem: (item: LinkBioItem) => void;
  updateLinkItem: (item: LinkBioItem) => void;
  deleteLinkItem: (id: string) => void;
  // Auth
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const DEFAULT_BIO_PROFILE: LinkBioProfile = {
  name: 'VENA',
  bio: 'Wedding photography',
  avatar: '/rsc/images/Photo-82-7eba7822-1000.jpg',
  theme: 'dark'
};

const DEFAULT_LINK_ITEMS: LinkBioItem[] = [
  { id: '1', label: 'Instagram', url: 'https://instagram.com', active: true },
  { id: '2', label: 'venapictures // Tiktok', url: 'https://tiktok.com', active: true },
  { id: '3', label: 'Admin 1 // Nisa', url: 'https://wa.me/6285693762240', active: true },
  { id: '4', label: 'Admin 2 // Eki', url: 'https://wa.me/6285693762240', active: true },
];

const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Projects Data
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('venapictures_projects');
    return saved ? JSON.parse(saved) : PORTFOLIO_DATA;
  });

  // Link Bio Data
  const [linkBioProfile, setLinkBioProfile] = useState<LinkBioProfile>(() => {
    const saved = localStorage.getItem('venapictures_bio_profile');
    return saved ? JSON.parse(saved) : DEFAULT_BIO_PROFILE;
  });

  const [linkItems, setLinkItems] = useState<LinkBioItem[]>(() => {
    const saved = localStorage.getItem('venapictures_link_items');
    return saved ? JSON.parse(saved) : DEFAULT_LINK_ITEMS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('venapictures_auth') === 'true';
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('venapictures_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('venapictures_bio_profile', JSON.stringify(linkBioProfile));
  }, [linkBioProfile]);

  useEffect(() => {
    localStorage.setItem('venapictures_link_items', JSON.stringify(linkItems));
  }, [linkItems]);

  // Project Actions
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  // Link Bio Actions
  const updateLinkBioProfile = (profile: LinkBioProfile) => {
    setLinkBioProfile(profile);
  };

  const addLinkItem = (item: LinkBioItem) => {
    setLinkItems(prev => [...prev, item]);
  };

  const updateLinkItem = (item: LinkBioItem) => {
    setLinkItems(prev => prev.map(i => i.id === item.id ? item : i));
  };

  const deleteLinkItem = (id: string) => {
    if (window.confirm('Delete this link?')) {
      setLinkItems(prev => prev.filter(i => i.id !== id));
    }
  };

  // Auth Actions
  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('venapictures_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('venapictures_auth');
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, addProject, updateProject, deleteProject, 
      linkBioProfile, updateLinkBioProfile, linkItems, addLinkItem, updateLinkItem, deleteLinkItem,
      isAuthenticated, login, logout 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// --- COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const FloatingWhatsApp: React.FC = () => {
  const location = useLocation();
  // Hide on admin and link bio page
  if (location.pathname.startsWith('/admin') || location.pathname === '/links') return null;

  return (
    <a 
      href="https://wa.me/6285693762240" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] group"
      aria-label="Contact on WhatsApp"
    >
      <div className="bg-white text-[#25D366] p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-stone-100">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="md:w-7 md:h-7 group-hover:text-[#20b858] transition-colors"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </div>
    </a>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = usePortfolio();
  
  const isPortfolioPage = location.pathname === '/portfolio';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLinkTreePage = location.pathname === '/links';

  const isTransparentPage = !isAdminPage && (['/', '/portfolio', '/about', '/contact'].includes(location.pathname) || location.pathname.startsWith('/project/'));

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isPortfolioPage ? 300 : 50;
      setIsScrolled(window.scrollY > threshold);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPortfolioPage]);

  // FIX: Early return must be AFTER all hooks are called
  if (isLinkTreePage) return null;

  // If Admin page, use a simpler solid header
  if (isAdminPage) {
    if (location.pathname === '/admin/login') return null; // No navbar on login
    return (
      <nav className="fixed top-0 w-full z-50 bg-stone-900 text-white shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/admin/dashboard" className="font-serif italic text-xl">VenaPictures Admin</Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xs uppercase tracking-widest hover:text-stone-300">View Site</Link>
            <Link to="/links" className="text-xs uppercase tracking-widest hover:text-stone-300">View Linktree</Link>
            {isAuthenticated && (
              <button onClick={logout} className="flex items-center space-x-2 text-xs uppercase tracking-widest hover:text-red-400">
                <LogOut size={14} /> <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  }

  const positionClass = (isPortfolioPage && !isScrolled && !mobileMenuOpen) ? 'absolute' : 'fixed';
  const animationClass = (isPortfolioPage && isScrolled && !mobileMenuOpen) ? 'animate-slide-down' : '';
  const shouldBeSolid = isScrolled || !isTransparentPage || mobileMenuOpen;

  const navClass = `${positionClass} top-0 w-full z-50 transition-all duration-300 ease-in-out ${animationClass} ${
    shouldBeSolid ? 'bg-white/95 backdrop-blur-sm text-stone-800 shadow-sm py-3' : 'bg-transparent text-white py-6'
  }`;

  const linkClass = `uppercase text-xs tracking-[0.2em] hover:text-stone-400 transition-colors duration-300`;

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center relative">
          
          <div className="hidden md:flex space-x-8 w-1/3">
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/portfolio" className={linkClass}>Portfolio</Link>
            <Link to="/portfolio" className={linkClass}>Family</Link>
          </div>

          <div className="w-1/3 flex justify-center">
            <Link to="/" className="group relative z-50">
               <img 
                 src={shouldBeSolid ? LOGO_DARK : LOGO_LIGHT} 
                 alt="VenaPictures Studio" 
                 className="h-7 md:h-10 lg:h-12 w-auto object-contain transition-opacity duration-300" 
               />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 justify-end w-1/3">
            <Link to="/about" className={linkClass}>About</Link>
            <Link to="/contact" className={linkClass}>Contact Us</Link>
            <Link to="/admin" className={linkClass}>{isAuthenticated ? 'Dashboard' : 'Login'}</Link>
          </div>

          <div className="md:hidden absolute right-0 z-50">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 md:hidden pt-20">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">Home</Link>
          <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">Portfolio</Link>
          <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">Family</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">Contact</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-base font-serif tracking-widest text-stone-800 hover:text-stone-500 transition-colors">{isAuthenticated ? 'Dashboard' : 'Login'}</Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/links') return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-50 py-12 md:py-16 px-6 border-t border-stone-200 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 space-y-6 md:space-y-0">
           <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-2 text-[10px] md:text-xs tracking-widest text-stone-600 uppercase">
                <Link to="/" className="hover:text-stone-900">Home</Link>
                <Link to="/about" className="hover:text-stone-900">About</Link>
                <Link to="/portfolio" className="hover:text-stone-900">Portfolio</Link>
                <Link to="/contact" className="hover:text-stone-900">Contact Us</Link>
                <Link to="#" className="hover:text-stone-900">Family</Link>
              </div>
           </div>
           
           <button onClick={scrollToTop} className="group flex items-center space-x-2 text-stone-500 hover:text-stone-800 transition-colors">
              <span className="text-[10px] md:text-xs uppercase tracking-widest">Back to top</span>
              <ArrowUp size={14} className="md:size-4 group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>

        <div className="h-px w-full bg-stone-200 mb-6 md:mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-stone-400 text-[9px] md:text-[10px] tracking-wide uppercase">
          <p>All content Copyright © 2025 VenaPictures</p>
          <div className="flex space-x-4 md:space-x-6 mt-3 md:mt-0">
             <span>X</span>
             <Instagram size={12} className="md:size-[14px] hover:text-stone-600 cursor-pointer" />
             <span>Tk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- APP ---

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              
              {/* Link Tree Public Route */}
              <Route path="/links" element={<LinkTreePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/links" element={<AdminLinksManager />} />
              <Route path="/admin/projects/new" element={<AdminProjectForm />} />
              <Route path="/admin/projects/edit/:id" element={<AdminProjectForm />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </HashRouter>
    </PortfolioProvider>
  );
};

export default App;