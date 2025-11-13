import { Business } from '../types';

export const businesses: Business[] = [
  {
    id: 1,
    name: 'Total bazar material de construção',
    category: 'Material de Construção',
    description: 'Os melhores preços da região com a maior variedade de produtos você só vai encontrar aqui.',
    shortDescription: 'Preço e atendimento que você merece.',
    location: {
      mapsUrl: 'https://maps.app.goo.gl/r5cGp6ArR758VwMQ6'
    },
    contact: {
      phone: '5521995544111',
      instagram: 'https://instagram.com/totalbazar',
      facebook: 'https://facebook.com/totalbazar'
    },
    photos: [
      '/images/total-bazar/file1.jpg',
      '/images/total-bazar/file2.jpg',
      '/images/total-bazar/file3.jpg',
      '/images/total-bazar/file4.jpg',
    ],
    reviews: [
      { rating: 5, comment: "Atendimento excelente e profissionais de alta qualidade. Recomendo!", author: "Maria S." },
      { rating: 4, comment: "Ótimo lugar, gostei do resultado do meu cabelo.", author: "Joana P." },
    ]
  },
  {
    id: 2,
    name: 'Lanche Feliz',
    category: 'Lanchonete',
    description: 'Os melhores hambúrgueres artesanais da região! Usamos ingredientes frescos e selecionados para garantir um sabor inesquecível. Temos opções vegetarianas e um cardápio variado de porções e bebidas. Perfeito para um happy hour ou um lanche em família.',
    shortDescription: 'Hambúrgueres artesanais, porções e bebidas.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lanche+Feliz'
    },
    contact: {
      phone: '5511988887777',
      instagram: 'https://instagram.com/lanchefeliz',
    },
    photos: [
      'https://via.placeholder.com/300/f59e0b/FFFFFF?text=Burger+Duplo',
      'https://via.placeholder.com/300/fbbf24/FFFFFF?text=Batata+Frita',
    ],
    reviews: [
      { rating: 5, comment: "O melhor hambúrguer que já comi! Atendimento rápido.", author: "Carlos R." }
    ]
  },
   {
    id: 3,
    name: 'ConstroiJá',
    category: 'Material de Construção',
    description: 'Tudo para sua obra, do básico ao acabamento. Oferecemos uma vasta gama de produtos, como cimento, areia, tijolos, pisos, tintas e ferramentas. Conte com nosso atendimento especializado para ajudar em seu projeto.',
    shortDescription: 'Tudo para sua obra, do básico ao acabamento.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ConstroiJá'
    },
    contact: {
      phone: '5511977776666',
    },
    photos: [
      'https://via.placeholder.com/300/a3a3a3/FFFFFF?text=Cimento',
      'https://via.placeholder.com/300/737373/FFFFFF?text=Ferramentas'
    ],
    reviews: [
      { rating: 4, comment: "Bons preços e entrega rápida.", author: "Pedro A." }
    ]
  }
];
