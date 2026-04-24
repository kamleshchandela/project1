import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-card dark:glass-card light:glass-card-light py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-serif font-bold text-amber-primary">HomeTruth AI</Link>
          <p className="mt-4 text-gray-400 max-w-sm">
            AI-powered home intelligence revealing hidden costs, risks, and government benefits. Find the truth before you move in.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/explore" className="hover:text-amber-primary transition-colors">Explore Homes</Link></li>
            <li><Link to="/schemes" className="hover:text-amber-primary transition-colors">Government Schemes</Link></li>
            <li><Link to="/services" className="hover:text-amber-primary transition-colors">Service Marketplace</Link></li>
            <li><Link to="/loan-optimizer" className="hover:text-amber-primary transition-colors">Loan Optimizer</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/privacy" className="hover:text-amber-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-amber-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-amber-primary transition-colors">Contact Us</Link></li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Globe size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Share2 size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HomeTruth AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
