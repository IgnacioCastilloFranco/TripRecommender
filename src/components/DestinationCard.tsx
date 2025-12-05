import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onSelect: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isSelected, 
  onSelect 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(destination);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(destination)}
      onKeyDown={handleKeyDown}
      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${isSelected ? 'ring-2 ring-primary-500 shadow-lg' : ''}`}
      aria-selected={isSelected}
      aria-label={`${destination.name}, ${destination.country}. ${isSelected ? 'Selected' : 'Click to view on map'}`}
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {destination.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <svg 
                className="w-4 h-4 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span className="truncate">{destination.country}</span>
            </p>
          </div>
          
          <span 
            className="flex-shrink-0 px-2.5 py-1 bg-secondary-100 text-secondary-700 
                       text-sm font-medium rounded-full"
            aria-label={`Budget: ${destination.estimatedBudget}`}
          >
            {destination.estimatedBudget}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-4">
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="sr-only">Highlights</h4>
          <div className="flex flex-wrap gap-1.5" role="list" aria-label="Destination highlights">
            {destination.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                role="listitem"
                className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-md"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>Best: {destination.bestTimeToVisit}</span>
          </div>
          
          {isSelected && (
            <span className="text-sm font-medium text-primary-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              Viewing
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
