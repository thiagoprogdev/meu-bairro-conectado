
export interface Review {
  rating: number;
  comment: string;
  author: string;
}

export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  location: {
    mapsUrl: string;
  };
  contact: {
    phone: string;
    instagram?: string;
    facebook?: string;
  };
  openingHours: string;
  photos: string[];
  reviews: Review[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets?: {
            uri: string;
            review: string;
        }[];
    }
  };
}

// Added shared navigation type to resolve type mismatch between Header and App components
export type AppPage = 'home' | 'business' | 'admin' | 'about' | 'plans' | 'help' | 'categories';
