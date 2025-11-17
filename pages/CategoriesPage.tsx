import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { businesses } from '../data/businesses';
import { categories } from '../data/categories';
import ResultCard from '../components/ResultCard';

interface CategoriesPageProps {
  initialCategory: string;
  onViewDetails: (business: Business) => void;
  onSelectCategory: (category: string) => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ initialCategory, onViewDetails, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (selectedCategory) {
      const results = businesses.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());
      setFilteredBusinesses(results);
    } else {
      setFilteredBusinesses([]);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Notify parent to update state for analytics tracking consistency
    onSelectCategory(category); 
  };

  return (
    <div className="container mx-auto max-w-5xl space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-green-800">Explore por Categoria</h1>
        {!selectedCategory ? (
            <p className="text-center text-gray-500 mb-8">Clique em uma categoria abaixo para ver os estabelecimentos.</p>
        ) : (
            <p className="text-center text-gray-500 mb-8">Mostrando resultados para: <span className="font-bold text-green-700">{selectedCategory}</span></p>
        )}

        {/* Category List */}
        {!selectedCategory && (
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="p-4 bg-green-100 text-green-800 font-semibold rounded-lg shadow-sm hover:bg-green-200 hover:shadow-md transition-all text-center"
                    >
                        {category}
                    </button>
                ))}
            </div>
        )}

        {/* Results */}
        {selectedCategory && (
            <div>
                 <button onClick={() => handleCategoryClick('')} className="mb-6 text-green-700 hover:underline">
                    &larr; Voltar para todas as categorias
                </button>
                {filteredBusinesses.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBusinesses.map((business) => (
                            <ResultCard key={business.id} business={business} onViewDetails={() => onViewDetails(business)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Nenhum estabelecimento encontrado para a categoria "{selectedCategory}".</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
