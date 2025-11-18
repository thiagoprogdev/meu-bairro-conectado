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
  openingHours: string; // Novo campo para horário de funcionamento
  photos: string[]; 
  reviews: Review[];
}


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
  photos: string[]; 
  reviews: Review[];
}
