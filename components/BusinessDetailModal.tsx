
import React, { useState, useEffect } from 'react';
import { Business, Review } from '../types';
import StarRating from './StarRating';
import { trackEvent } from '../services/analytics';

interface BusinessDetailModalProps {
    business: Business;
    onClose: () => void;
}

const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({ business, onClose }) => {
    const { id, name, description, location, photos, contact, openingHours } = business;
    
    // Estado para armazenar as reviews (agora apenas as estáticas/aprovadas)
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userRating, setUserRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Carrega reviews apenas dos dados oficiais (props)
    useEffect(() => {
        setReviews(business.reviews || []);
    }, [business.reviews]);

    // Calcula a média baseado no estado atual das reviews
    const averageRating = reviews.length > 0 
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
        : 0;

    const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const comment = formData.get('comment') as string;
        const author = formData.get('author') as string;

        if (!comment || userRating === 0 || !author) {
            alert("Por favor, preencha seu nome, adicione um comentário e selecione uma nota.");
            return;
        }

        setIsSubmitting(true);

        const reviewData = {
            formType: 'Nova Avaliação (Moderação)',
            businessName: name,
            businessId: id,
            author: author,
            rating: userRating,
            comment: comment,
            date: new Date().toLocaleString('pt-BR')
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar avaliação');
            }

            setSubmitSuccess(true);
            event.currentTarget.reset();
            setUserRating(0);

        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            alert('Ocorreu um erro ao enviar sua avaliação. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const trackContactClick = (type: string) => {
        trackEvent('click_contact', {
            contact_type: type,
            business_name: name,
            business_id: id
        });
    };


    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" 
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-green-800">{name}</h2>
                             <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('maps')} className="text-sm text-green-600 hover:underline">Ver no Mapa</a>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                     <div className="mt-2 flex items-center space-x-2">
                        <StarRating rating={averageRating} />
                        <span className="text-gray-600 text-sm">({reviews.length} avaliações)</span>
                    </div>

                    {openingHours && (
                        <div className="mt-4 flex items-center text-gray-600 bg-gray-50 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium">{openingHours}</span>
                        </div>
                    )}

                    <p className="mt-4 text-gray-600">{description}</p>
                </div>

                {/* Photo Gallery */}
                {photos && photos.length > 0 && (
                    <div className="px-6 mt-4">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Galeria de Fotos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {photos.map((photo, index) => (
                                <a href={photo} target="_blank" rel="noopener noreferrer" key={index} className="group bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                                    <img 
                                        src={photo} 
                                        alt={`Foto ${index + 1} de ${name}`} 
                                        className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}


                {/* Contact and Social */}
                <div className="p-6 mt-4 bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Contato e Redes Sociais</h3>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href={`https://wa.me/${contact.phone}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => trackContactClick('whatsapp')}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-green-600"
                        >
                            <span>WhatsApp</span>
                        </a>
                        {contact.instagram && (
                            <a 
                                href={contact.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => trackContactClick('instagram')}
                                className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600"
                            >
                                Instagram
                            </a>
                        )}
                        {contact.facebook && (
                             <a 
                                href={contact.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => trackContactClick('facebook')}
                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700"
                            >
                                Facebook
                            </a>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="p-6 rounded-b-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Avaliações</h3>
                    
                    {reviews.length === 0 ? (
                        <p className="text-gray-500 italic mb-6">Este estabelecimento ainda não possui avaliações. Seja o primeiro!</p>
                    ) : (
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {reviews.slice().reverse().map((review, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <div className="flex justify-between items-center">
                                        <StarRating rating={review.rating} />
                                        <span className="text-xs text-gray-400 font-medium">{review.author}</span>
                                    </div>
                                    <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Review Form */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        {submitSuccess ? (
                            <div className="text-center py-6 animate-fade-in-right">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-bold text-green-800">Avaliação Recebida!</h4>
                                <div className="text-sm text-gray-600 mt-2 space-y-2">
                                    <p>
                                        Obrigado por compartilhar sua experiência!
                                    </p>
                                    <p>
                                        Para manter a qualidade da nossa comunidade, sua avaliação passará por uma breve análise seguindo nossas <strong>diretrizes de moderação</strong>.
                                    </p>
                                    <p>
                                        Assim que aprovada, ela estará visível para todos aqui no perfil do estabelecimento.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setSubmitSuccess(false)} 
                                    className="mt-4 text-sm text-green-700 font-medium hover:underline"
                                >
                                    Enviar outra avaliação
                                </button>
                            </div>
                        ) : (
                            <>
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Deixe sua avaliação</h4>
                                <form className="space-y-4" onSubmit={handleReviewSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sua nota</label>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setUserRating(star)}
                                                    className="focus:outline-none transform hover:scale-110 transition-transform"
                                                >
                                                    <svg className={`w-8 h-8 ${userRating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Seu Nome</label>
                                        <input type="text" id="author" name="author" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2" placeholder="Como você quer ser identificado?" />
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Seu comentário</label>
                                        <textarea id="comment" name="comment" rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2" placeholder="Conte sua experiência..."></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:bg-gray-400"
                                        >
                                            {isSubmitting ? 'Enviando...' : 'Publicar Avaliação'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailModal;
