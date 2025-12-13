/* main React component for the Trip Recommender application. It orchestrates the UI and logic
 for searching travel destinations using AI, displaying results, handling loading and error states
 and showing an interactive map. */

import React, { useState } from 'react';
import { 
  Header, 
  SearchInput, 
  DestinationList, 
  MapView, 
  LoadingSpinner, 
  ErrorMessage 
} from './components';
import { useDestinationSearch } from './hooks/useDestinationSearch';
import { Destination } from './types';

/*React automatically invokes this function whenever it needs to render or re-render the UI, for example, at start, after state changes or when props are updated. it is managed by React's rendering engine*/

const App: React.FC = () => {/*  React.FC type annotation indicates that this is a function component in React. */
  const { 
    isLoading, 
    error, 
    destinations, 
    searchDestinations, 
    clearResults
  } = useDestinationSearch(); // Custom hook to manage destination search (data fetching) state and logic

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null); // React state variable using the useState hook to manage (UI interaction state) which destination the user has currently selected in the Trip Recommender application

  const handleSearch = (query: string) => {//event handler that is triggered when a user submits a search query in the Trip Recommender application.
    setSelectedDestination(null);// resets the currently selected destination to null. This ensures that any previously selected destination is cleared before new search results arrive
    searchDestinations(query);//calls the search function from the useDestinationSearch hook, passing the user's query. This triggers the async operation that sets the loading state, calls the AI service, and eventually populates the destinations array with new results
  };

  const handleClear = () => {//clears the current search results and resets the selected destination in the Trip Recommender application
    setSelectedDestination(null);
    clearResults();
  };

  const handleSelectDestination = (destination: Destination) => { //event handler that manages toggling destination selection in the Trip Recommender application—implementing a "click to select, click again to deselect" behavior. arg is the destination card the user clicked
    setSelectedDestination((prev: Destination | null) => 
      prev?.id === destination.id ? null : destination //If the previously selected destination's id matches the clicked destination's id, the user is clicking the same item again—so it deselects by returning null. Otherwise, it selects the new destination by returning it.
    );
  };

  const hasResults = destinations.length > 0;

  //the main UI structure of the Trip Recommender application. It uses Tailwind CSS for styling and implements a responsive, accessible layout.
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Skip link feature for accessibility. helps keyboard and screen reader users navigate. This is a requirement for WCAG (Web Content Accessibility Guidelines) compliance at Level A, making it essential for building inclusive web applications.*/}
      <a href="#main-content" className="skip-link">{/* creates an anchor link that jumps to an element with id="main-content" somewhere else on the page. the browser scrolls directly to that element and moves keyboard focus there. Skip links are typically styled to be visually hidden by default, then become visible when they receive keyboard focus. This way, sighted mouse users don't see the link (since they don't need it), but keyboard users who Tab through the page will see it appear as the first focusable element.*/}
        Skip to main content
      </a>

      <Header onClear={handleClear} hasResults={hasResults} />  {/* renders the top navigation of the Trip Recommender application. In React, components are reusable pieces of UI that can accept inputs (props). hasResults={hasResults} passes a boolean value that indicates whether the application currently has search results to display. The Header component uses this to conditionally render UI elements— a "New Search" button when there are results to clear.*/}

      <main 
        id="main-content" 
        className="flex-1 container mx-auto px-4 py-6 sm:py-8"
        role="main"
      >
        {/* Search Section */}
        <section 
          className={`transition-all duration-500 ${
            hasResults ? 'mb-6' : 'flex flex-col items-center justify-center min-h-[40vh]'
          }`}
          aria-label="Search for travel destinations"
        >
          {!hasResults && !isLoading && (
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Where do you want to go?
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Describe your ideal trip and let AI find the perfect destinations for you
              </p>
            </div>
          )}

          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center my-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-md mx-auto my-8">
            <ErrorMessage message={error} onRetry={() => handleClear()} />
          </div>
        )}

        {/* Results Section */}
        {hasResults && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Map View - Full width on mobile, left side on desktop */}
            <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[600px] lg:sticky lg:top-6">
              <MapView
                destinations={destinations}
                selectedDestination={selectedDestination}
                onSelectDestination={handleSelectDestination}
              />
            </div>

            {/* Destination List - Below map on mobile, right side on desktop */}
            <div className="order-2 lg:order-1">
              <DestinationList
                destinations={destinations}
                selectedDestination={selectedDestination}
                onSelectDestination={handleSelectDestination}
              />
            </div>
          </div>
        )}

        {/* Empty State when not loading and no results */}
        {!hasResults && !isLoading && !error && (
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Describe Your Trip</h3>
                <p className="text-sm text-gray-600">Tell us about your ideal vacation - beach, mountains, city, adventure, or relaxation</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Finds Matches</h3>
                <p className="text-sm text-gray-600">Our AI analyzes your preferences to suggest the best matching destinations</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Explore the Map</h3>
                <p className="text-sm text-gray-600">View all recommendations on an interactive map to plan your journey</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Powered by{' '}
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
            >
              Google Gemini AI
            </a>
            {' '}• Map data © OpenStreetMap contributors
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
