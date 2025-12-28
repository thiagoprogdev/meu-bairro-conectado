
import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { businesses as localBusinesses } from '../data/businesses';
import { generateText } from '../services/geminiService';
import { trackEvent } from '../services/analytics';
import ImageSlider from '../components/ImageSlider';
import FeaturedCard from '../components/FeaturedCard';
import ResultCard from '../components/ResultCard';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
);

const featuredBusinesses = localBusinesses.slice(0, 8);

interface HomePageProps {
    onViewDetails: (business: Business) => void;
    onNavigateToBusiness?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetails, onNavigateToBusiness }) => {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resultsSummary, setResultsSummary] = useState<string | null>(null);
    const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

    useEffect(() => {
        const executeSearch = async () => {
            if (!searchTerm) {
                setResultsSummary(null);
                setFilteredBusinesses([]);
                return;
            }
            
            setLoading(true);
            setError(null);
            trackEvent('search', { search_term: searchTerm });

            try {
                const lowerCaseQuery = searchTerm.toLowerCase();
                const results = localBusinesses.filter(b =>
                    b.name.toLowerCase().includes(lowerCaseQuery) ||
                    b.category.toLowerCase().includes(lowerCaseQuery) ||
                    b.description.toLowerCase().includes(lowerCaseQuery)
                );
                
                setFilteredBusinesses(results);

                if (results.length > 0) {
                    const summaryPrompt = `O usuário buscou por "${searchTerm}" no app de guia comercial. Encontramos ${results.length} parceiros locais. Escreva uma frase curta convidando o usuário a conhecer esses estabelecimentos e valorizar o comércio local.`;
                    const summaryResponse = await generateText(summaryPrompt);
                    setResultsSummary(summaryResponse.text ?? "Confira os parceiros encontrados para sua busca:");
                } else {
                    setResultsSummary(`Não encontramos parceiros oficiais para "${searchTerm}" ainda. Que tal indicar um estabelecimento?`);
                }

            } catch (err) {
                setError('Ocorreu um erro ao processar sua busca.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        executeSearch();
    }, [searchTerm]);

    const handleManualSearch = () => {
        if (!query) return;
        setSearchTerm(query);
    };

    return (
        <div className="container mx-auto max-w-5xl space-y-8">
            <ImageSlider />

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-4xl font-extrabold text-center mb-2 text-green-800">Explore o seu Bairro</h1>
                <p className="text-center text-gray-500 mb-8">Encontre parceiros verificados perto de você.</p>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                            placeholder="Ex: salão de beleza, padaria, pet shop..."
                            className="w-full p-4 pl-12 text-lg border-2 border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <SearchIcon />
                        </div>
                    </div>
                    <button
                        onClick={handleManualSearch}
                        disabled={loading}
                        className="bg-green-800 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-all shadow-lg min-w-[140px]"
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            {searchTerm && (
                <div className="space-y-6">
                    {resultsSummary && (
                        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-600 text-green-900 italic text-sm">
                            {resultsSummary}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBusinesses.map((business) => (
                            <ResultCard key={business.id} business={business} onViewDetails={() => onViewDetails(business)} />
                        ))}
                        
                        {onNavigateToBusiness && (
                            <div onClick={onNavigateToBusiness} className="cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col justify-center items-center text-center hover:bg-white hover:border-green-300 transition-all">
                                <div className="bg-green-100 p-3 rounded-full mb-3 text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Seu negócio aqui?</h3>
                                <p className="text-[10px] text-gray-500 mt-2">Seja encontrado por milhares de moradores do bairro.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {!searchTerm && !loading && (
                 <div>
                     <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nossos Parceiros em Destaque</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {featuredBusinesses.map((business) => (
                             <FeaturedCard 
                                key={business.id} 
                                business={business} 
                                onClick={() => onViewDetails(business)} 
                             />
                         ))}
                     </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
