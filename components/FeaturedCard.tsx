import React from 'react';
import { Business } from '../types';

interface FeaturedCardProps {
  business: Business;
  onClick: () => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ business, onClick }) => {
  const { name, category, photos } = business;
  const image = photos && photos.length > 0 ? photos[0] : '/images/placeholder.jpg';

  return (
    <button 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 text-left w-full"
    >
      <img src={image} alt={name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate" title={name}>{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </button>
  );
};

export default FeaturedCard;
