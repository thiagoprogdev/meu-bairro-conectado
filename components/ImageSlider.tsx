import React, { useState, useEffect, useCallback } from 'react';

const slides = [
    { url: '/images/slide/luz da alvorada.jpg', alt: 'Restaurante Luz da Alvorada' },
    { url: '/images/slide/file1.jpg', alt: 'Total bazar material de construção' },
    { url: '/images/slide/logoacai.jpg', alt: 'Açaí Grumari' },
    { url: '/images/slide/logovania.jpeg', alt: 'Vânia Marques confeitaria' },
    { url: '/images/slide/logodeivisoncacau.png', alt: 'Equipe Deivison Cacau' }
];

const ImageSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg bg-gray-900 group">
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Camada de Fundo (Desfocada para preencher o espaço) */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img 
                            src={slide.url} 
                            alt="" 
                            className="w-full h-full object-cover blur-md scale-110 opacity-50" 
                            aria-hidden="true"
                        />
                    </div>

                    {/* Camada Principal (Imagem nítida e inteira) */}
                    <div className="relative w-full h-full flex items-center justify-center p-1">
                        <img 
                            src={slide.url} 
                            alt={slide.alt} 
                            className="max-w-full max-h-full object-contain shadow-sm z-10 drop-shadow-lg" 
                        />
                    </div>
                </div>
            ))}
            
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full focus:outline-none z-20 transition-all opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full focus:outline-none z-20 transition-all opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentIndex(index)} 
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-40 hover:bg-opacity-70'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;