
import React, { useState } from 'react';
import { Business } from '../types';
import StarRating from './StarRating';

interface BusinessDetailModalProps {
    business: Business;
    onClose: () => void;
}

const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({ business, onClose }) => {
    const { name, description, location, photos, contact, reviews } = business;
    const [userRating, setUserRating] = useState(0);

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);

    const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const comment = formData.get('comment') as string;

        if (!comment || userRating === 0) {
            alert("Por favor, adicione um comentário e selecione uma avaliação em estrelas.");
            return;
        }

        console.log({
            message: "Nova avaliação submetida (simulação)",
            business: name,
            rating: userRating,
            comment: comment,
        });

        alert("Obrigado pela sua avaliação! Em uma aplicação real, seu comentário apareceria aqui.");
        event.currentTarget.reset();
        setUserRating(0);
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
                             <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline">Ver no Mapa</a>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                    </div>
                     <div className="mt-2 flex items-center space-x-2">
                        <StarRating rating={averageRating} />
                        <span className="text-gray-600 text-sm">({reviews.length} avaliações)</span>
                    </div>

                    <p className="mt-4 text-gray-600">{description}</p>
                </div>

                {/* Photo Gallery */}
                {photos && photos.length > 0 && (
                    <div className="px-6 mt-4">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Galeria de Fotos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {photos.map((photo, index) => (
                                <a href={photo} target="_blank" rel="noopener noreferrer" key={index}>
                                    <img src={photo} alt={`Foto ${index + 1}`} className="rounded-md object-cover h-32 w-full"/>
                                </a>
                            ))}
                        </div>
                    </div>
                )}


                {/* Contact and Social */}
                <div className="p-6 mt-4 bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Contato e Redes Sociais</h3>
                    <div className="flex flex-wrap gap-4">
                        <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-green-600">
                            <span>WhatsApp</span>
                        </a>
                        {contact.instagram && (
                            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600">
                                Instagram
                            </a>
                        )}
                        {contact.facebook && (
                             <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700">
                                Facebook
                            </a>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="p-6 rounded-b-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Avaliações</h3>
                    <div className="space-y-4 mb-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <StarRating rating={review.rating} />
                                <p className="mt-2 text-gray-700">{review.comment}</p>
                                <p className="text-xs text-gray-500 mt-1">- {review.author}</p>
                            </div>
                        ))}
                    </div>

                    {/* Review Form */}
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Deixe sua avaliação</h4>
                    <form className="space-y-4" onSubmit={handleReviewSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sua nota</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setUserRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <svg className={`w-6 h-6 ${userRating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Seu comentário</label>
                            <textarea id="comment" name="comment" rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" placeholder="Conte sua experiência..."></textarea>
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                                Enviar Avaliação
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailModal;
