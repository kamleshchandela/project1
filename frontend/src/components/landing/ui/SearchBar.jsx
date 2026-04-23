import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder, value, onChange, onSearch }) => {
  return (
    <div className="relative group w-full max-w-2xl">
      <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative flex items-center bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/50 transition-colors focus-within:ring-2 focus-within:ring-amber-500/50">
        <div className="pl-4 text-amber-500">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent p-4 outline-none text-white placeholder-gray-400"
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button 
          onClick={onSearch}
          className="px-6 py-4 bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
