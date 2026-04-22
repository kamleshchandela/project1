import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 glass-card dark:glass-card light:glass-card-light px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-amber-primary">HomeTruth AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className="hover:text-amber-primary transition-colors">Explore</Link>
          <Link to="/map" className="hover:text-amber-primary transition-colors">Map</Link>
          <Link to="/virtual-tours" className="hover:text-amber-primary transition-colors">3D Tours</Link>
          <Link to="/services" className="hover:text-amber-primary transition-colors">Services</Link>
          <Link to="/schemes" className="hover:text-amber-primary transition-colors">Schemes</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-amber-primary transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 p-1 rounded-full border border-white/20">
                <img src={user?.avatar || 'https://via.placeholder.com/32'} alt="avatar" className="w-8 h-8 rounded-full" />
              </Link>
              <button onClick={() => dispatch(logout())} className="hover:text-critical transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-amber px-4 py-1.5 text-sm">Login</Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col items-center animate-fade-in">
          <Link to="/explore" className="text-lg" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/map" className="text-lg" onClick={() => setIsMenuOpen(false)}>Map</Link>
          <Link to="/virtual-tours" className="text-lg" onClick={() => setIsMenuOpen(false)}>3D Tours</Link>
          <Link to="/services" className="text-lg" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/schemes" className="text-lg" onClick={() => setIsMenuOpen(false)}>Schemes</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => dispatch(logout())} className="text-lg text-critical">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-amber w-full text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
