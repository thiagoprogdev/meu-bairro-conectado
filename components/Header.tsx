import React, { useState, useEffect, useRef } from 'react';
import { categories } from '../data/categories';

type Page = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help' | 'categories';
interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: Page) => void;
    onCategorySelect: (category: string) => void;
    onNavigateHome: () => void;
    onNavigateToCategories: () => void;
}

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#166534"/>
            <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0" fill="#f59e0b"/>
        </svg>
        <span className="text-2xl font-bold text-white">Meu Bairro Conectado</span>
    </div>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onCategorySelect, onNavigateHome, onNavigateToCategories }) => {
    const navItemClasses = "py-2 px-3 rounded-md text-sm font-medium transition-colors";
    const mobileNavItemClasses = "block px-3 py-2 rounded-md text-base font-medium";
    const activeClasses = "bg-green-900 text-white";
    const inactiveClasses = "text-green-100 hover:bg-green-700 hover:text-white";
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
                setIsMobileCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCategoryClick = (category: string) => {
        onCategorySelect(category);
        setIsDropdownOpen(false);
        setIsMobileCategoryOpen(false);
        setIsMobileMenuOpen(false);
    }
    
    const handleMobileLinkClick = (page: Page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false);
        setIsMobileCategoryOpen(false);
    }
    
    const handleMobileHomeClick = () => {
        onNavigateHome();
        setIsMobileMenuOpen(false);
        setIsMobileCategoryOpen(false);
    }

    return (
        <header className="bg-green-800 shadow-md sticky top-0 z-30" ref={headerRef}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={onNavigateHome}>
                            <Logo />
                        </button>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={onNavigateHome} className={`${navItemClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}>
                                Início
                            </button>
                             <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${navItemClasses} ${currentPage === 'categories' ? activeClasses : inactiveClasses}`}>
                                    Categorias
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <a
                                              href="#"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                onNavigateToCategories();
                                                setIsDropdownOpen(false);
                                              }}
                                              className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                              role="menuitem"
                                            >
                                              Ver Todas
                                            </a>
                                            {categories.map(category => (
                                                <a
                                                  key={category}
                                                  href="#"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCategoryClick(category);
                                                  }}
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                  role="menuitem"
                                                >
                                                  {category}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setCurrentPage('about')} className={`${navItemClasses} ${currentPage === 'about' ? activeClasses : inactiveClasses}`}>
                                Quem Somos
                            </button>
                            <button onClick={() => setCurrentPage('plans')} className={`${navItemClasses} ${currentPage === 'plans' ? activeClasses : inactiveClasses}`}>
                                Planos
                            </button>
                             <button onClick={() => setCurrentPage('help')} className={`${navItemClasses} ${currentPage === 'help' ? activeClasses : inactiveClasses}`}>
                                Ajuda
                            </button>
                            <button onClick={() => setCurrentPage('business')} className={`${navItemClasses} ${currentPage === 'business' ? activeClasses : inactiveClasses}`}>
                                Para Empresas
                            </button>
                        </div>
                    </div>
                    {/* Hamburger Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="bg-green-800 inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={handleMobileHomeClick} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}>
                            Início
                        </button>
                        
                        <div>
                            <button onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)} className={`w-full text-left flex justify-between items-center ${mobileNavItemClasses} ${currentPage === 'categories' ? activeClasses : inactiveClasses}`}>
                                <span>Categorias</span>
                                <svg className={`w-5 h-5 transition-transform ${isMobileCategoryOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isMobileCategoryOpen && (
                                <div className="mt-1 pl-4 space-y-1">
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onNavigateToCategories();
                                        setIsMobileMenuOpen(false);
                                        setIsMobileCategoryOpen(false);
                                      }}
                                      className="block px-3 py-2 rounded-md text-base font-bold text-green-200 hover:bg-green-700 hover:text-white"
                                      role="menuitem"
                                    >
                                      Ver Todas
                                    </a>
                                    {categories.map(category => (
                                        <a
                                          key={category}
                                          href="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleCategoryClick(category);
                                          }}
                                          className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:bg-green-700 hover:text-white"
                                          role="menuitem"
                                        >
                                          {category}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <button onClick={() => handleMobileLinkClick('about')} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'about' ? activeClasses : inactiveClasses}`}>
                            Quem Somos
                        </button>
                        <button onClick={() => handleMobileLinkClick('plans')} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'plans' ? activeClasses : inactiveClasses}`}>
                            Planos
                        </button>
                        <button onClick={() => handleMobileLinkClick('help')} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'help' ? activeClasses : inactiveClasses}`}>
                            Ajuda
                        </button>
                        <button onClick={() => handleMobileLinkClick('business')} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'business' ? activeClasses : inactiveClasses}`}>
                            Para Empresas
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
