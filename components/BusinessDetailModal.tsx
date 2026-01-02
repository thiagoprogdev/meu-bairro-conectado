import React, { useState, useEffect } from 'react';
import { Business, Review } from '../types';
import StarRating from './StarRating';
import { trackEvent } from '../services/analytics';
import { getLocalReviews } from '../services/reviewService';

interface BusinessDetailModalProps {
    business: Business;
    onClose: () => void;
}

const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({ business, onClose }) => {
    const { id, name, description, location, photos, contact, openingHours, reviews: staticReviews } = business;
    
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [activePhoto, setActivePhoto] = useState(0);

    useEffect(() => {
        // Busca avaliações locais usando o serviço recém-criado
        const localReviews = getLocalReviews(id);
        setAllReviews([...(staticReviews || []), ...localReviews]);
    }, [id, staticReviews]);

    const trackContactClick = (type: string) => {
        trackEvent('click_contact', {
            contact_type: type,
            business_name: name,
            business_id: id
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-40 flex justify-center items-center backdrop-blur-sm p-4 overflow-y-auto" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-auto animate-scale-up overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Galeria de Fotos */}
                <div className="relative bg-gray-100">
                    <div className="h-64 md:h-80 w-full flex items-center justify-center overflow-hidden">
                        {photos && photos.length > 0 ? (
                            <img 
                                src={photos[activePhoto]} 
                                alt={name} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-300 flex flex-col items-center">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                <span className="text-xs mt-2 font-medium text-gray-400 uppercase tracking-widest">Sem fotos</span>
                            </div>
                        )}
                    </div>

                    {photos && photos.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent overflow-x-auto">
                            {photos.map((photo, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-12 h-12 flex-shrink-0 rounded-lg border-2 transition-all ${idx === activePhoto ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                                >
                                    <img src={photo} alt="" className="w-full h-full object-cover rounded" />
                                </button>
                            ))}
                        </div>
                    )}

                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors z-10"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
                        <a 
                            href={location.mapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded hover:underline"
                        >
                            Ver no Mapa
                        </a>
                    </div>

                    {openingHours && (
                        <p className="text-sm text-green-600 font-semibold mb-4 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {openingHours}
                        </p>
                    )}

                    <p className="text-gray-700 mb-8 leading-relaxed">{description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <a 
                            href={`https://wa.me/${contact.phone}?text=Olá! Vi o ${name} no Meu Bairro Conectado.`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('whatsapp')}
                            className="bg-green-600 text-white font-bold py-3 rounded-xl text-center shadow-lg hover:bg-green-700"
                        >
                            WhatsApp
                        </a>
                        {contact.instagram && (
                            <a 
                                href={contact.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-gray-900 text-white font-bold py-3 rounded-xl text-center shadow-lg hover:bg-black"
                            >
                                Instagram
                            </a>
                        )}
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4">Avaliações</h3>
                        {allReviews.length === 0 ? (
                            <p className="text-gray-500 text-sm italic">Nenhuma avaliação ainda.</p>
                        ) : (
                            <div className="space-y-4">
                                {allReviews.map((review, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-sm">{review.author}</span>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailModal;
