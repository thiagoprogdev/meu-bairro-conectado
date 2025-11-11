
import React from 'react';

interface FeaturedCardProps {
  image: string;
  title: string;
  category: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ image, title, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
