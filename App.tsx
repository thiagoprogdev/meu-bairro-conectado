
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BusinessAdminPage from './pages/BusinessAdminPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import PlansPage from './pages/PlansPage';
import HelpPage from './pages/HelpPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Chatbot from './components/Chatbot';
import BusinessDetailModal from './components/BusinessDetailModal';
import { Business, AppPage } from './types';

const App: React.FC = () => {
  /* Fix: Widened the state type to AppPage to allow navigation to all pages requested by the Header component */
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
  };

  /* Fix: Added missing cases to renderPage to correctly display all sub-pages in the SPA */
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onViewDetails={handleViewDetails} onNavigateToBusiness={() => setCurrentPage('business')} />;
      case 'business':
        return <BusinessAdminPage />;
      case 'categories':
        return <CategoriesPage initialCategory="" onViewDetails={handleViewDetails} onSelectCategory={() => {}} />;
      case 'about':
        return <AboutPage />;
      case 'plans':
        return <PlansPage />;
      case 'help':
        return <HelpPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage onViewDetails={handleViewDetails} onNavigateToBusiness={() => setCurrentPage('business')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onNavigateHome={() => setCurrentPage('home')}
        onNavigateToCategories={() => setCurrentPage('categories')}
      />
      
      <main className="flex-grow py-8">
        {renderPage()}
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Meu Bairro Conectado. Fortalecendo a economia local.</p>
      </footer>

      {selectedBusiness && (
        <BusinessDetailModal 
          business={selectedBusiness} 
          onClose={() => setSelectedBusiness(null)} 
        />
      )}
      
      <Chatbot />
    </div>
  );
};

export default App;
