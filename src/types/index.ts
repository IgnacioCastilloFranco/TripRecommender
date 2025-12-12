export interface Destination {//a travel destination returned by the AI service. The request to the api asks for these specific fields to describe each destination.
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

export interface SearchState {//the state of an asynchronous search operation. 
  isLoading: boolean;
  error: string | null;
  destinations: Destination[];
}

export interface MapViewport {
  center: [number, number];//latitude and longitude coordinates for the map's center point.
  zoom: number;//zoom level of the map.
}
