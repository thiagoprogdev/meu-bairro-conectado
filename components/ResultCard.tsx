
import React from 'react';
import { Business } from '../types';
import { trackEvent } from '../services/analytics';

interface ResultCardProps {
  business: Business;
  onViewDetails: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ business, onViewDetails }) => {
  const { name, shortDescription, photos, contact } = business;
  const image = photos && photos.length > 0 ? photos[0] : 'https://via.placeholder.com/300/f3f4f6/374151?text=Parceiro+MBC';
  
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('click_whatsapp_list', {
      business_name: name,
      business_id: business.id
    });
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transform transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:shadow-md">
      <div className="relative w-full h-36 bg-gray-50 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-widest flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              Verificado
          </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-sm text-gray-800 truncate" title={name}>{name}</h3>
        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 h-7">{shortDescription}</p>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
        <button 
            onClick={onViewDetails}
            className="w-full bg-green-700 text-white text-[10px] font-bold py-2 rounded-md hover:bg-green-800 transition-colors"
        >
            Ver Detalhes e Avaliações
        </button>
        {contact.phone && (
            <a 
                href={`https://wa.me/${contact.phone}?text=Olá! Vi sua loja no Meu Bairro Conectado.`} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full text-center bg-green-500 text-white text-[10px] font-bold py-2 rounded-md hover:bg-green-600 transition-colors"
            >
                WhatsApp
            </a>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
