import React, { useState, useEffect, useRef } from 'react';

type Page = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help' | 'categories';
interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: Page) => void;
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

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onNavigateHome, onNavigateToCategories }) => {
    const navItemClasses = "py-2 px-3 rounded-md text-sm font-medium transition-colors";
    const mobileNavItemClasses = "block px-3 py-2 rounded-md text-base font-medium";
    const activeClasses = "bg-green-900 text-white";
    const inactiveClasses = "text-green-100 hover:bg-green-700 hover:text-white";
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const handleMobileLinkClick = (page: Page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="bg-green-800 shadow-md sticky top-0 z-30 pt-[env(safe-area-inset-top)]" ref={headerRef}>
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
                            <button onClick={onNavigateToCategories} className={`${navItemClasses} ${currentPage === 'categories' ? activeClasses : inactiveClasses}`}>
                                Categorias
                            </button>
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
                        <button onClick={() => { onNavigateHome(); setIsMobileMenuOpen(false); }} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}>
                            Início
                        </button>
                        
                        <button onClick={() => { onNavigateToCategories(); setIsMobileMenuOpen(false); }} className={`w-full text-left ${mobileNavItemClasses} ${currentPage === 'categories' ? activeClasses : inactiveClasses}`}>
                            Categorias
                        </button>
                        
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
