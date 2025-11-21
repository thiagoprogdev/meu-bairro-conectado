import React from 'react';
import { Business } from '../types';
import { trackEvent } from '../services/analytics';

interface ResultCardProps {
  business: Business;
  onViewDetails: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ business, onViewDetails }) => {
  const { name, shortDescription, photos, contact } = business;
  // Use a imagem local como placeholder
  const image = photos && photos.length > 0 ? photos[0] : '/images/placeholder.jpg';
  
  const handleWhatsAppClick = () => {
    trackEvent('click_whatsapp_list', {
      business_name: name,
      business_id: business.id
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
      <div className="w-full h-48 bg-gray-50 p-2">
          <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg text-gray-800 truncate" title={name}>{name}</h3>
        <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{shortDescription}</p>
      </div>
      <div className="p-4 bg-gray-50 flex flex-col sm:flex-row gap-2">
        <button 
          onClick={onViewDetails}
          className="w-full bg-green-700 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Ver Detalhes
        </button>
        <a 
          href={`https://wa.me/${contact.phone}?text=Olá! Vi sua loja no Meu Bairro Conectado.`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="w-full text-center bg-green-500 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-green-400 transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ResultCard;
