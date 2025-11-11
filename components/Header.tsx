
import React, { useState, useEffect, useRef } from 'react';

type Page = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help';
interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: Page) => void;
    onCategorySelect: (category: string) => void;
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

const categories = [
    'Salão de Beleza', 
    'Material de Construção', 
    'Papelaria', 
    'Lanchonete',
    'Pet Shop',
    'Mercado',
    'Farmácia',
    'Restaurante',
    'Academia',
];


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onCategorySelect }) => {
    const navItemClasses = "py-2 px-3 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-green-900 text-white";
    const inactiveClasses = "text-green-100 hover:bg-green-700 hover:text-white";
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
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
    }

    return (
        <header className="bg-green-800 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Logo />
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => setCurrentPage('home')} className={`${navItemClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}>
                                Início
                            </button>
                             <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${navItemClasses} ${inactiveClasses}`}>
                                    Categorias
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
                </div>
            </nav>
        </header>
    );
};

export default Header;