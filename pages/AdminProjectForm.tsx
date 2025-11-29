import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { usePortfolio } from '../App';
import { Project } from '../types';

const AdminProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, addProject, updateProject, isAuthenticated } = usePortfolio();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    couple: '',
    category: 'Wedding',
    coverImage: '',
    date: '',
    location: '',
    images: []
  });
  const [imagesText, setImagesText] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    if (isEditing && id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setFormData(project);
        setImagesText(project.images.join('\n'));
      }
    } else {
      setFormData(prev => ({ ...prev, id: Date.now().toString() }));
    }
  }, [id, isEditing, projects, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImagesText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArray = imagesText.split('\n').filter(url => url.trim() !== '');
    const finalProject = { ...formData, images: imagesArray };

    if (isEditing) {
      updateProject(finalProject);
    } else {
      addProject(finalProject);
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4 text-stone-500 hover:text-stone-800 transition-colors w-fit">
          <Link to="/admin/dashboard" className="flex items-center gap-2 text-xs uppercase tracking-widest"><ArrowLeft size={14} /> Back to Dashboard</Link>
        </div>
        
        <div className="bg-white p-6 md:p-8 lg:p-12 shadow-sm border border-stone-100">
          <h1 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6 md:mb-8">{isEditing ? 'Edit Project' : 'New Project'}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Couple Name</label>
                <input name="couple" value={formData.couple} onChange={handleChange} required className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none transition-colors" placeholder="e.g. Romeo - Juliet" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Project Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none transition-colors" placeholder="e.g. Italian Summer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none bg-transparent">
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Couple Session">Couple Session</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Date</label>
                <input name="date" value={formData.date} onChange={handleChange} required className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none transition-colors" placeholder="e.g. October 2024" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Location</label>
              <input name="location" value={formData.location} onChange={handleChange} required className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none transition-colors" placeholder="e.g. Lake Como, Italy" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Cover Image URL</label>
              <div className="flex gap-4 items-end">
                <input name="coverImage" value={formData.coverImage} onChange={handleChange} required className="w-full border-b border-stone-200 py-2 text-sm md:text-base focus:border-stone-800 focus:outline-none transition-colors" placeholder="https://..." />
                {formData.coverImage && <img src={formData.coverImage} alt="Preview" className="w-10 h-10 md:w-12 md:h-12 object-cover bg-stone-100 rounded" />}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-500">Gallery Images (One URL per line)</label>
              <textarea 
                value={imagesText} 
                onChange={handleImagesChange} 
                rows={6}
                className="w-full border border-stone-200 p-3 md:p-4 text-xs md:text-sm focus:border-stone-800 focus:outline-none transition-colors rounded-sm"
                placeholder="https://image1.jpg&#10;https://image2.jpg"
              />
            </div>

            <div className="pt-4 md:pt-6">
              <button type="submit" className="bg-stone-800 text-white px-6 py-2.5 md:px-8 md:py-3 text-[10px] md:text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors flex items-center gap-2">
                <Save size={14} className="md:w-4 md:h-4" /> Save Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectForm;
