import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BusinessAdminPage from './pages/BusinessAdminPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AboutPage from './pages/AboutPage';
import PlansPage from './pages/PlansPage';
import HelpPage from './pages/HelpPage';
import CategoriesPage from './pages/CategoriesPage'; // Import new page
import Chatbot from './components/Chatbot';
import BusinessDetailModal from './components/BusinessDetailModal';
import { Business } from './types';
import { trackPageView, trackEvent } from './services/analytics';


type Page = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help' | 'categories'; // Add 'categories'

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
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for category page

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
      categories: { path: '/categorias', title: 'Categorias' }, // Add categories page
    };
    const pageInfo = pageMap[currentPage];
    if (pageInfo) {
      // For categories, add the specific category to the path for better tracking
      const path = currentPage === 'categories' && selectedCategory ? `${pageInfo.path}/${selectedCategory}` : pageInfo.path;
      const title = currentPage === 'categories' && selectedCategory ? `${selectedCategory} - ${pageInfo.title}` : pageInfo.title;
      trackPageView(path, title);
    }
  }, [currentPage, selectedCategory]);


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
            // Proteção: Verifica se a API de Notificação existe no navegador (evita crash no iPhone antigo)
            if ('Notification' in window && Notification.permission === 'granted') {
                try {
                    new Notification(detail.title, { body: detail.body });
                } catch (e) {
                    console.warn('Erro ao exibir notificação nativa:', e);
                }
            }
        }
    };

    window.addEventListener('promotion-notification', handleNotification);

    return () => {
        window.removeEventListener('promotion-notification', handleNotification);
    };
  }, []);

  const handleNavigateToCategories = () => {
      setSelectedCategory('');
      setCurrentPage('categories');
  };

  const navigateHome = () => {
    setCurrentPage('home');
    setSelectedCategory('');
  };

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
    
    // Rastreia o clique no card da empresa (Evento Customizado - Fácil de ver)
    trackEvent('business_card_click', {
        business_name: business.name,
        business_category: business.category,
        business_id: business.id,
    });

    // Mantém o evento padrão de Ecommerce do GA4
    trackEvent('view_item', {
        item_id: String(business.id),
        item_name: business.name,
        item_category: business.category,
    });
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onViewDetails={handleViewDetails} />;
      case 'categories':
        return <CategoriesPage initialCategory={selectedCategory} onViewDetails={handleViewDetails} onSelectCategory={setSelectedCategory} />;
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
        return <HomePage onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {notification && <NotificationToast notification={notification} onClose={() => setNotification(null)} />}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onNavigateToCategories={handleNavigateToCategories} 
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

export default App
