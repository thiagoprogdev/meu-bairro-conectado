import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BusinessAdminPage from './pages/BusinessAdminPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AboutPage from './pages/AboutPage';
import PlansPage from './pages/PlansPage';
import HelpPage from './pages/HelpPage';
import Chatbot from './components/Chatbot';
import BusinessDetailModal from './components/BusinessDetailModal';
import { Business } from './types';
import { trackPageView, trackEvent } from './services/analytics.ts';


type Page = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help';

interface NotificationPayload {
    title: string;
    body: string;
    category: string;
}

const NotificationToast: React.FC<{ notification: NotificationPayload; onClose: () => void; }> = ({ notification, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 6000); // Auto-close after 6 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-5 right-5 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50 border-l-4 border-green-500 animate-fade-in-right">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                     <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{notification.body}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button onClick={onClose} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <span className="sr-only">Close</span>
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [notification, setNotification] = useState<NotificationPayload | null>(null);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Rastreamento de visualização de página para o Google Analytics
  useEffect(() => {
    const pageMap: { [key in Page]: { path: string; title: string } } = {
      home: { path: '/', title: 'Página Inicial' },
      business: { path: '/para-empresas', title: 'Para Empresas' },
      admin: { path: '/admin', title: 'Painel do Administrador' },
      about: { path: '/quem-somos', title: 'Quem Somos' },
      plans: { path: '/planos', title: 'Planos' },
      help: { path: '/ajuda', title: 'Ajuda' },
    };
    const pageInfo = pageMap[currentPage];
    if (pageInfo) {
      trackPageView(pageInfo.path, pageInfo.title);
    }
  }, [currentPage]);


  useEffect(() => {
    const handleNotification = (event: Event) => {
        const detail = (event as CustomEvent).detail as NotificationPayload;
        const savedSubs = localStorage.getItem('notification-subs');
        const subscriptions = savedSubs ? JSON.parse(savedSubs) : [];
        
        const categoryMap: { [key: string]: string } = {
            'Salão de Beleza': 'beleza',
            'Material de Construção': 'construcao',
            'Papelaria': 'papelaria',
            'Lanchonete': 'lanchonete'
        };

        const categoryKey = categoryMap[detail.category] || detail.category;

        if (subscriptions.includes(categoryKey)) {
            setNotification(detail);
            if (Notification.permission === 'granted') {
                new Notification(detail.title, { body: detail.body });
            }
        }
    };

    window.addEventListener('promotion-notification', handleNotification);

    return () => {
        window.removeEventListener('promotion-notification', handleNotification);
    };
  }, []);

  const handleCategorySearch = (category: string) => {
    setInitialSearchQuery(category);
    setCurrentPage('home');
    // Rastreia a busca por categoria no Google Analytics
    trackEvent('search', { search_term: category });
  };

  const navigateHome = () => {
    setCurrentPage('home');
    setInitialSearchQuery('');
  };

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage initialQuery={initialSearchQuery} onViewDetails={handleViewDetails} />;
      case 'business':
        return <BusinessAdminPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'plans':
        return <PlansPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <HomePage initialQuery={initialSearchQuery} onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onCategorySelect={handleCategorySearch} 
        onNavigateHome={navigateHome}
      />
      <main className="p-4 md:p-8">
        {renderPage()}
      </main>
      <Chatbot />
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>&copy; 2024 Meu Bairro Conectado. Todos os direitos reservados.</p>
      </footer>
       {isModalOpen && selectedBusiness && (
        <BusinessDetailModal 
          business={selectedBusiness} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
