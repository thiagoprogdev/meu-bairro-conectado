import React, { useState, useEffect, useCallback } from 'react';

const slides = [
    { url: 'https://via.placeholder.com/1200x400/166534/FFFFFF?text=Descubra+seu+Bairro', alt: 'Descubra seu Bairro' },
    { url: 'https://via.placeholder.com/1200x400/f59e0b/FFFFFF?text=Comércio+Local+Forte', alt: 'Comércio Local Forte' },
    { url: 'https://via.placeholder.com/1200x400/84cc16/FFFFFF?text=Restaurantes+e+Cafés', alt: 'Restaurantes e Cafés' },
    { url: 'https://via.placeholder.com/1200x400/16a34a/FFFFFF?text=Serviços+Essenciais', alt: 'Serviços Essenciais' },
    { url: 'https://via.placeholder.com/1200x400/4d7c0f/FFFFFF?text=Apoie+os+Pequenos', alt: 'Apoie os Pequenos' },
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
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            {slides.map((slide, index) => (
                <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
                </div>
            ))}
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10">
                &#10095;
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-white'}`}></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
