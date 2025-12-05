import React from 'react';

interface HeaderProps {
  onClear: () => void;
  hasResults: boolean;
}

const Header: React.FC<HeaderProps> = ({ onClear, hasResults }) => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center"
              aria-hidden="true"
            >
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Trip Recommender
              </h1>
              <p className="text-sm sm:text-base text-primary-100 hidden sm:block">
                AI-powered travel destination finder
              </p>
            </div>
          </div>
          
          {hasResults && (
            <button
              onClick={onClear}
              className="self-start sm:self-auto px-4 py-2 bg-white/10 hover:bg-white/20 
                         rounded-lg text-sm font-medium transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Clear search results and start new search"
            >
              New Search
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
