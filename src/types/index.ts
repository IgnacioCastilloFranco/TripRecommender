export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
  highlights: string[];
  bestTimeToVisit: string;
  estimatedBudget: string;
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  destinations: Destination[];
}

export interface MapViewport {
  center: [number, number];
  zoom: number;
}
