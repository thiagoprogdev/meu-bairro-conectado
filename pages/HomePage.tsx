import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { businesses } from '../data/businesses';
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

const featuredBusinesses = businesses.slice(0, 8);


const NotificationPreferences: React.FC = () => {
    const categories = ['beleza', 'construcao', 'papelaria', 'lanchonete'];
    const categoryLabels: { [key: string]: string } = {
        beleza: 'Salão de Beleza',
        construcao: 'Material de Construção',
        papelaria: 'Papelaria',
        lanchonete: 'Lanchonete',
    };
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    
    // Inicializa estado de forma segura para navegadores sem suporte (iOS < 16.4)
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            return Notification.permission;
        }
        return 'unsupported';
    });

    useEffect(() => {
        const savedSubs = localStorage.getItem('notification-subs');
        if (savedSubs) {
            setSubscriptions(JSON.parse(savedSubs));
        }
    }, []);

    const handleSubscriptionChange = (category: string) => {
        setSubscriptions(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleSave = async () => {
        // Proteção contra navegadores que não suportam notificações
        if (!('Notification' in window)) {
             alert('As notificações não são suportadas neste navegador ou dispositivo.');
             // Ainda salva as preferências locais para o toast in-app
             localStorage.setItem('notification-subs', JSON.stringify(subscriptions));
             return;
        }

        if (Notification.permission === 'default') {
            try {
                const permission = await Notification.requestPermission();
                setNotificationPermission(permission);
                if (permission !== 'granted') {
                    alert('Permissão para notificações negada. Você não receberá alertas no dispositivo, apenas no site.');
                    // Não retorna, permite salvar preferências para toasts internos
                }
            } catch (e) {
                console.error('Erro ao solicitar permissão:', e);
            }
        }

        localStorage.setItem('notification-subs', JSON.stringify(subscriptions));
        
        if (notificationPermission === 'granted' || Notification.permission === 'granted') {
             alert('Preferências salvas com sucesso!');
        } else {
             alert('Preferências salvas! Habilite as notificações no navegador para receber alertas mesmo fora do site.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-green-800">Preferências de Notificação</h3>
            <p className="text-gray-600 mb-4">Selecione as categorias para receber alertas sobre novidades e promoções.</p>
            <div className="space-y-2 mb-4">
                {categories.map(category => (
                    <div key={category} className="flex items-center">
                        <input
                            id={category}
                            type="checkbox"
                            checked={subscriptions.includes(category)}
                            onChange={() => handleSubscriptionChange(category)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={category} className="ml-3 min-w-0 flex-1 text-gray-700">{categoryLabels[category]}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className="w-full bg-green-700 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600">
                Salvar Preferências
            </button>
        </div>
    );
};

interface HomePageProps {
    onViewDetails: (business: Business) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onViewDetails }) => {
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resultsSummary, setResultsSummary] = useState<string | null>(null);
    const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
    
    // Efeito para executar a busca
    useEffect(() => {
        const executeSearch = async () => {
            if (!searchTerm) {
                setResultsSummary(null);
                setFilteredBusinesses([]);
                return;
            }
            
            setLoading(true);
            setError(null);
            setResultsSummary(null);
            setFilteredBusinesses([]);

            trackEvent('search', { search_term: searchTerm });

            await new Promise(resolve => setTimeout(resolve, 500));

            try {
                const lowerCaseQuery = searchTerm.toLowerCase();
                const results = businesses.filter(b =>
                    b.name.toLowerCase().includes(lowerCaseQuery) ||
                    b.category.toLowerCase().includes(lowerCaseQuery) ||
                    b.description.toLowerCase().includes(lowerCaseQuery) ||
                    b.shortDescription.toLowerCase().includes(lowerCaseQuery)
                );
                
                setFilteredBusinesses(results);

                let summaryPrompt = '';
                if (results.length > 0) {
                    const businessNames = results.map(b => b.name).join(', ');
                    summaryPrompt = `Escreva um pequeno texto amigável dizendo que você encontrou ${results.length} resultado(s) para a busca "${searchTerm}", incluindo: ${businessNames}.`;
                } else {
                    summaryPrompt = `Escreva um pequeno texto amigável dizendo que nenhum resultado foi encontrado para a busca "${searchTerm}", e sugira ao usuário tentar outros termos ou explorar as categorias.`;
                }

                const response = await generateText(summaryPrompt);
                setResultsSummary(response.text ?? null);

            } catch (err) {
                setError('Ocorreu um erro ao buscar. Tente novamente.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        executeSearch();
    }, [searchTerm]);

    const handleManualSearch = () => {
        if (!query) {
            setError('Por favor, digite o que você procura.');
            return;
        }
        setSearchTerm(query);
    };

    return (
        <div className="container mx-auto max-w-5xl space-y-8">
            <ImageSlider />

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-4xl font-extrabold text-center mb-2 text-green-800">O que tem no seu bairro?</h1>
                <p className="text-center text-gray-500 mb-8">Encontre tudo o que precisa perto de você com a ajuda da IA.</p>
                
                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                            placeholder="Ex: salão de beleza, material de construção..."
                            className="w-full p-4 pl-12 text-lg border-2 border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 transition-shadow shadow-sm hover:shadow-md"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <SearchIcon />
                        </div>
                    </div>

                    <button
                        onClick={handleManualSearch}
                        disabled={loading}
                        className="w-full bg-green-800 text-white font-bold py-3 px-4 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Buscando...</span>
                            </>
                        ) : (
                            <>
                                <SearchIcon />
                                <span>Encontrar no meu bairro</span>
                            </>
                        )}
                    </button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </div>
            </div>

            {resultsSummary && (
                 <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold mb-4 text-green-800">Resultados da Busca</h3>
                    <div className="prose max-w-none text-gray-700 mb-6">
                        {resultsSummary}
                    </div>

                    {filteredBusinesses.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredBusinesses.map((business) => (
                                <ResultCard key={business.id} business={business} onViewDetails={() => onViewDetails(business)} />
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {!searchTerm && !loading && (
                 <div className="mb-8">
                     <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Destaques</h2>
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

            <NotificationPreferences />
        </div>
    );
};

export default HomePage;
