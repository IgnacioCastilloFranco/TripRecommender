import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Something went wrong
          </h3>
          <p className="text-red-600 text-sm">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white 
                       rounded-lg text-sm font-medium transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Try searching again"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
