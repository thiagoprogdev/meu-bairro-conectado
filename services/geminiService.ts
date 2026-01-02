import { Review } from '../types';

const STORAGE_KEY = 'mbc_business_reviews';

interface StoredReviews {
  [businessId: number]: Review[];
}

export const getLocalReviews = (businessId: number): Review[] => {
  try {
    if (typeof window === 'undefined') return [];
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (!storageData) return [];
    
    const parsedData: StoredReviews = JSON.parse(storageData);
    return parsedData[businessId] || [];
  } catch (error) {
    console.error('Erro ao carregar avaliações locais:', error);
    return [];
  }
};

export const addLocalReview = (businessId: number, review: Review): void => {
  try {
    if (typeof window === 'undefined') return;
    const storageData = localStorage.getItem(STORAGE_KEY);
    const parsedData: StoredReviews = storageData ? JSON.parse(storageData) : {};

    if (!parsedData[businessId]) {
      parsedData[businessId] = [];
    }

    parsedData[businessId].push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
  } catch (error) {
    console.error('Erro ao salvar avaliação local:', error);
  }
};
