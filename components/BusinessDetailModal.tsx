
import React, { useState, useEffect } from 'react';
import { Business, GroundingChunk } from '../types';
import StarRating from './StarRating';
import { trackEvent } from '../services/analytics';
import { getGoogleReviews } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";

interface BusinessDetailModalProps {
    business: Business;
    onClose: () => void;
}

interface GoogleReviewSnippet {
    text: string;
    url: string;
}

const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({ business, onClose }) => {
    const { id, name, description, location, photos, contact, openingHours } = business;
    
    const [googleReviews, setGoogleReviews] = useState<GoogleReviewSnippet[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [errorReviews, setErrorReviews] = useState(false);
    const [activePhoto, setActivePhoto] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoadingReviews(true);
            setErrorReviews(false);
            try {
                const response: GenerateContentResponse = await getGoogleReviews(name);
                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
                
                const snippets: GoogleReviewSnippet[] = [];
                
                if (groundingChunks) {
                    groundingChunks.forEach((chunk) => {
                        if (chunk.maps?.placeAnswerSources?.reviewSnippets) {
                            chunk.maps.placeAnswerSources.reviewSnippets.forEach((s) => {
                                // Evita duplicatas se houver
                                if (!snippets.some(exist => exist.text === s.review)) {
                                    snippets.push({
                                        text: s.review,
                                        url: s.uri
                                    });
                                }
                            });
                        }
                    });
                }
                
                // Limitamos a 10 resultados caso a IA traga mais
                setGoogleReviews(snippets.slice(0, 10));
            } catch (err) {
                console.error("Erro ao carregar avaliações do Google:", err);
                setErrorReviews(true);
            } finally {
                setIsLoadingReviews(false);
            }
        };

        fetchReviews();
    }, [name]);

    const trackContactClick = (type: string) => {
        trackEvent('click_contact', {
            contact_type: type,
            business_name: name,
            business_id: id
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center backdrop-blur-sm p-4" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Gallery Header */}
                <div className="relative group">
                    <div className="h-64 md:h-80 w-full bg-gray-200">
                        {photos && photos.length > 0 ? (
                            <img 
                                src={photos[activePhoto]} 
                                alt={`${name} - Foto ${activePhoto + 1}`} 
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-green-100">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails Overlay */}
                    {photos && photos.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4 overflow-x-auto pb-2 scrollbar-hide">
                            {photos.map((photo, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-12 h-12 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all ${idx === activePhoto ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={photo} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10">
                        &times;
                    </button>
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        PARCEIRO VERIFICADO
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
                             <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('maps')} className="text-sm text-green-600 hover:underline flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                Ver endereço no Maps
                             </a>
                        </div>
                    </div>

                    {openingHours && (
                        <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">{openingHours}</span>
                        </div>
                    )}

                    <p className="text-gray-600 leading-relaxed text-base mb-8">{description}</p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <a 
                            href={`https://wa.me/${contact.phone}?text=Olá! Vi sua loja no Meu Bairro Conectado e gostaria de mais informações.`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('whatsapp')}
                            className="bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg hover:bg-green-700 transition-all transform hover:scale-[1.02]"
                        >
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Falar no WhatsApp
                        </a>
                        {contact.instagram && (
                            <a 
                                href={contact.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => trackContactClick('instagram')}
                                className="bg-gray-800 text-white font-bold py-4 rounded-xl flex items-center justify-center hover:bg-black transition-all"
                            >
                                Perfil no Instagram
                            </a>
                        )}
                    </div>

                    {/* Google Reviews Section */}
                    <div className="border-t pt-8">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Avaliações do Bairro</h3>
                                <p className="text-[10px] text-gray-400">Sincronizado com o Google Maps via IA</p>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-widest flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                                AO VIVO
                            </span>
                        </div>
                        
                        {isLoadingReviews ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse pb-4 border-b border-gray-50">
                                        <div className="flex items-center mb-2">
                                            <div className="h-3 bg-gray-100 rounded w-24"></div>
                                        </div>
                                        <div className="h-3 bg-gray-50 rounded w-full mb-1"></div>
                                        <div className="h-3 bg-gray-50 rounded w-4/5"></div>
                                    </div>
                                ))}
                                <p className="text-center text-[10px] text-gray-400 italic">Buscando avaliações recentes...</p>
                            </div>
                        ) : errorReviews ? (
                            <div className="text-center py-4 bg-red-50 rounded-xl text-red-500 text-xs">
                                Não foi possível carregar as avaliações do Google agora.
                            </div>
                        ) : googleReviews.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <svg className="mx-auto h-8 w-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-gray-400 text-sm italic">Nenhuma avaliação detalhada encontrada no Google Maps.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {googleReviews.map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-green-200 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <StarRating rating={5} />
                                            <span className="text-[9px] text-gray-400 font-medium">#{index + 1} Recente</span>
                                        </div>
                                        <p className="text-gray-700 text-sm italic leading-relaxed font-serif">"{review.text}"</p>
                                        <div className="mt-3 text-right">
                                            <a 
                                                href={review.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-[10px] text-green-600 font-bold hover:underline bg-green-50 px-2 py-1 rounded"
                                            >
                                                Ver Completa no Maps &rarr;
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-center text-[9px] text-gray-300 mt-6 uppercase tracking-[0.2em]">Tecnologia Gemini 2.5 Flash</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailModal;
