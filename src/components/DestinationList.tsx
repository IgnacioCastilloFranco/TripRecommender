import React from 'react';
import { Destination } from '../types';
import DestinationCard from './DestinationCard';

interface DestinationListProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (destination: Destination) => void;
}

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
}) => {
  if (destinations.length === 0) {
    return null;
  }

  return (
    <section 
      className="w-full"
      aria-label="Recommended destinations"
    >
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Recommended Destinations
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {destinations.length} destination{destinations.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div 
        className="grid grid-cols-1 gap-4"
        role="list"
        aria-label="List of recommended destinations"
      >
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isSelected={selectedDestination?.id === destination.id}
            onSelect={onSelectDestination}
          />
        ))}
      </div>
    </section>
  );
};

export default DestinationList;
