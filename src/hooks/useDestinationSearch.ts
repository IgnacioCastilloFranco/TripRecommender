import { useState, useCallback } from 'react';
import { Destination, SearchState } from '../types';
import { generateTravelDestinations } from '../services/geminiService';

export const useDestinationSearch = () => {
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    destinations: [],
  });

  const searchDestinations = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a travel preference or destination' }));
      return;
    }

    setState({ isLoading: true, error: null, destinations: [] });

    try {
      const destinations = await generateTravelDestinations(query);
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

  const selectDestination = useCallback((destination: Destination) => {
    setState(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => ({
        ...d,
        selected: d.id === destination.id,
      })),
    }));
  }, []);

  return {
    ...state,
    searchDestinations,
    clearResults,
    selectDestination,
  };
};
