
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
        // Combina avaliações estáticas do arquivo com avaliações salvas localmente
        const localReviews = getLocalReviews(id);
        setAllReviews([...staticReviews, ...localReviews]);
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
                {/* Galeria de Fotos Original */}
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

                    {/* Miniaturas de Navegação */}
                    {photos && photos.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent overflow-x-auto scrollbar-hide">
                            {photos.map((photo, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-12 h-12 flex-shrink-0 rounded-lg border-2 transition-all ${idx === activePhoto ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={photo} alt="" className="w-full h-full object-cover rounded" />
                                </button>
                            ))}
                        </div>
                    )}

                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors z-10 shadow-lg"
                    >
                        &times;
                    </button>
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        PARCEIRO VERIFICADO
                    </div>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight">{name}</h2>
                        <a 
                            href={location.mapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('maps')}
                            className="text-xs text-green-700 hover:underline flex items-center justify-end font-bold bg-green-50 px-2 py-1 rounded"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            Ver no Mapa
                        </a>
                    </div>

                    {openingHours && (
                        <div className="flex items-center text-gray-700 text-sm mb-6 bg-green-50/50 p-3 rounded-xl border border-green-100">
                            <svg className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">{openingHours}</span>
                        </div>
                    )}

                    <p className="text-gray-700 text-base leading-relaxed mb-8">{description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        <a 
                            href={`https://wa.me/${contact.phone}?text=Olá! Vi o ${name} no Meu Bairro Conectado.`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('whatsapp')}
                            className="bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center text-sm shadow-xl hover:bg-green-700 transition-all transform hover:scale-[1.02]"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Falar no WhatsApp
                        </a>
                        {contact.instagram && (
                            <a 
                                href={contact.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center text-sm shadow-xl hover:bg-black transition-all"
                            >
                                Perfil no Instagram
                            </a>
                        )}
                    </div>

                    {/* Seção de Avaliações Original */}
                    <div className="border-t pt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Avaliações da Comunidade</h3>
                        
                        {allReviews.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 text-sm italic">Este parceiro ainda não possui avaliações. Seja o primeiro a avaliar!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {allReviews.map((review, index) => (
                                    <div key={index} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-gray-800 text-sm">{review.author}</span>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <p className="text-gray-700 text-sm italic leading-relaxed">"{review.comment}"</p>
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
