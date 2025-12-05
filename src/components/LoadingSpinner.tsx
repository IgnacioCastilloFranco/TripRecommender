import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Finding your perfect destinations...' 
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8 space-y-4"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-pulse"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
        
        {/* Center icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg 
            className="w-6 h-6 text-primary-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-700 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-1">Powered by AI</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
