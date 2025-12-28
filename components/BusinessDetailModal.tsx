
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
                
                // Exibe as 10 últimas encontradas
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
            className="fixed inset-0 bg-black/80 z-40 flex justify-center items-center backdrop-blur-sm p-4 overflow-y-auto" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Simplified Gallery Header */}
                <div className="relative">
                    <div className="h-64 md:h-80 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                        {photos && photos.length > 0 ? (
                            <img 
                                src={photos[activePhoto]} 
                                alt={name} 
                                className="w-full h-full object-contain bg-gray-50"
                            />
                        ) : (
                            <div className="text-gray-300">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            </div>
                        )}
                    </div>

                    {/* Simple Thumbnails */}
                    {photos && photos.length > 1 && (
                        <div className="flex justify-center gap-2 p-2 bg-white border-b overflow-x-auto">
                            {photos.map((photo, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-12 h-12 flex-shrink-0 rounded border-2 transition-all ${idx === activePhoto ? 'border-green-600' : 'border-transparent'}`}
                                >
                                    <img src={photo} alt="" className="w-full h-full object-cover rounded-sm" />
                                </button>
                            ))}
                        </div>
                    )}

                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10">
                        &times;
                    </button>
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">
                        VERIFICADO
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                        <a 
                            href={location.mapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('maps')}
                            className="text-xs text-green-700 hover:underline flex items-center mt-1 font-medium"
                        >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            Ver localização no mapa
                        </a>
                    </div>

                    {openingHours && (
                        <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6 text-sm">
                            <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {openingHours}
                        </div>
                    )}

                    <p className="text-gray-700 text-sm leading-relaxed mb-8">{description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <a 
                            href={`https://wa.me/${contact.phone}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('whatsapp')}
                            className="bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center text-xs shadow-md"
                        >
                            Falar no WhatsApp
                        </a>
                        {contact.instagram && (
                            <a 
                                href={contact.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center text-xs shadow-md"
                            >
                                Instagram
                            </a>
                        )}
                    </div>

                    {/* Reviews Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Últimas 10 Avaliações</h3>
                        
                        {isLoadingReviews ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse h-16 bg-gray-50 rounded-lg"></div>
                                ))}
                            </div>
                        ) : errorReviews ? (
                            <div className="text-center py-4 text-gray-400 text-xs">
                                Avaliações não disponíveis no momento.
                            </div>
                        ) : googleReviews.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-400 text-xs">Nenhuma avaliação encontrada recentemente.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {googleReviews.map((review, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center mb-2">
                                            <StarRating rating={5} />
                                            <span className="text-[10px] text-gray-400 ml-2">via Google Maps</span>
                                        </div>
                                        <p className="text-gray-700 text-sm italic">"{review.text}"</p>
                                        <div className="mt-2 text-right">
                                            <a 
                                                href={review.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-[10px] text-green-700 font-bold"
                                            >
                                                Ver no Google &rarr;
                                            </a>
                                        </div>
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
