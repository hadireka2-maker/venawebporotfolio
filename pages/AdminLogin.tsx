import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../App';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 md:p-8 lg:p-12 shadow-md max-w-md w-full text-center space-y-5 md:space-y-6">
        <h2 className="text-xl md:text-2xl font-serif italic text-stone-800">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-stone-300 py-2 text-center text-sm md:text-base text-stone-700 focus:outline-none focus:border-stone-800 transition-colors"
          />
          {error && <p className="text-red-500 text-[10px] md:text-xs uppercase tracking-widest">{error}</p>}
          <button type="submit" className="w-full bg-stone-800 text-white py-2.5 md:py-3 text-[10px] md:text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors">
            Login
          </button>
        </form>
        <div className="text-[10px] md:text-xs text-stone-400 mt-4">Hint: admin123</div>
      </div>
    </div>
  );
};

export default AdminLogin;
