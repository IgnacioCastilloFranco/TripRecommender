import { useState, useCallback } from 'react';
import { Destination, SearchState } from '../types';
import { generateTravelDestinations } from '../services/geminiService';

export const useDestinationSearch = () => {
  const [state, setState] = useState<SearchState>({/*initializes a piece of React state using the useState hook, with TypeScript providing type safety through the SearchState generic type parameter.*/
    isLoading: false,
    error: null,
    destinations: [],
  });

  const searchDestinations = useCallback(async (query: string) => {//handles searching for travel destinations based on a user's query. The function is wrapped in React's useCallback hook, which memoizes the function to prevent unnecessary re-creations on each render—improving performance.
    if (!query.trim()) {
      setState((prev: SearchState) => ({ ...prev, error: 'Please enter a travel preference or destination' }));
      return;
    }

    setState({ isLoading: true, error: null, destinations: [] });//If the query is valid, the function enters the loading phase by setting isLoading: true, clearing any previous errors, and emptying the destinations array

    try {
      const destinations = await generateTravelDestinations(query);// This calls the GoogleGenerativeAI with the user's query. This function interacts with the AI model to fetch relevant travel destinations based on the input.
      setState({ isLoading: false, error: null, destinations });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        destinations: [],
      });
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({ isLoading: false, error: null, destinations: [] });
  }, []);

  const selectDestination = useCallback((destination: Destination) => {//handles selecting a specific destination from the search results. When a destination is selected, it updates the destinations array to mark the selected destination.
    setState((prev: SearchState) => ({
      ...prev,                                                          //spreads the previous state to retain other properties like isLoading and error.
      destinations: prev.destinations.map((d: Destination) => ({        //creates a new array of destinations by mapping over the previous destinations array. For each destination, it creates a new object that copies all properties of the original destination.    
        ...d,                                                           //spreads the properties of the current destination object. 
        selected: d.id === destination.id,                              //adds or updates the selected property. It sets selected to true if the current destination's id matches the id of the destination being selected; otherwise, it sets it to false.  
      })),
    }));
  }, []);

  return {
    ...state, /*spreads the current state properties (isLoading, error, destinations) into the returned object.*/
    searchDestinations,
    clearResults,
    selectDestination,
  };
};
