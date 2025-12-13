/* 
React component that provides the search interface for the Trip Recommender application
*/

import React, { useState, FormEvent, KeyboardEvent } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const placeholderExamples = [
    "Beach destination with good nightlife",
    "Romantic getaway in Europe",
    "Adventure trip with hiking trails",
    "Family-friendly destination with theme parks",
    "Cultural city with great food scene",
  ];

  const randomPlaceholder = placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="travel-search" className="sr-only">
          Enter your travel preferences
        </label>
        
        <div className="relative">
          <textarea
            id="travel-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`e.g., "${randomPlaceholder}"`}
            disabled={isLoading}
            rows={3}
            className="w-full px-4 py-4 pr-14 text-base sm:text-lg 
                       border-2 border-gray-200 rounded-xl
                       focus:border-primary-500 focus:ring-4 focus:ring-primary-100
                       placeholder:text-gray-400 resize-none
                       disabled:bg-gray-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            aria-describedby="search-help"
          />
          
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-3 bottom-3 p-2.5
                       bg-primary-600 hover:bg-primary-700 
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       text-white rounded-lg
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={isLoading ? 'Searching for destinations' : 'Search for destinations'}
          >
            {isLoading ? (
              <svg 
                className="w-5 h-5 animate-spin" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            )}
          </button>
        </div>
        
        <p id="search-help" className="mt-2 text-sm text-gray-500 text-center">
          Describe your ideal trip - include preferences like climate, activities, budget, or specific regions
        </p>
      </form>
    </div>
  );
};

export default SearchInput;
