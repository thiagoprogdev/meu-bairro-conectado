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
      '/images/total-bazar/file2.jpeg',
      '/images/total-bazar/file3.jpeg',
      '/images/total-bazar/file4.jpeg'
    ],
    reviews: [
      { rating: 5, comment: "Atendimento excelente e profissionais de alta qualidade. Recomendo!", author: "Maria S." },
      { rating: 4, comment: "Ótimo lugar, gostei do resultado do meu cabelo.", author: "Joana P." },
    ]
  },
  {
    id: 2,
    name: 'Açaí Grumari',
    category: 'Açaiteria',
    description: 'Fundada desde 2011, a empresa Açaí Grumari, vem atuando com foco e determinação no ramo de produtos alimentícios, tendo como em sua base a excelência na qualidade, através de processos modernos e de total higiene.',
    shortDescription: 'Açai e sorvetes.',
    location: {
      mapsUrl: 'https://maps.app.goo.gl/ZcFcMK8AGJT7wtPu6'
    },
    contact: {
      phone: '5521983135924',
      instagram: 'https://www.instagram.com/acaigrumari',
      facebook: 'https://www.facebook.com/acaigrumari/'
    },
    photos: [
      '/images/acai-grumari/logo.jpg', 
      '/images/acai-grumari/file1.jpg',
      '/images/acai-grumari/file2.jpg',
      '/images/acai-grumari/file3.jpg'
    ],
    reviews: [
      { rating: 5, comment: "O melhor açaí que já tomei na minha vida.", author: "Carlos R." }
    ]
  },
   {
    id: 3,
    name: 'Fornini pizzaria',
    category: 'Pizzaria',
    description: 'Pizzaria tradicional com uma variedade de sabores e ingredientes frescos. Ambiente acolhedor e atendimento de qualidade.',
    shortDescription: 'Pizzas artesanais e delivery rápido.',
    location: {
      mapsUrl: 'https://maps.app.goo.gl/Rh29inHmwEdQNin89'
    },
    contact: {
      phone: '5521999055637',
    },
    photos: [
      '/images/fornini/logofornini.png',
      '/images/fornini/file1.png',
      '/images/fornini/file2.jpg',
      '/images/fornini/file3.png'
    ],
    reviews: [
      { rating: 4, comment: "Bons preços e entrega rápida.", author: "Pedro A." }
    ]
  },
  {
    id: 4,
    name: 'Total Bazar',
    category: 'Papelaria',
    description: 'Sua papelaria e bazar completo no bairro! Encontre materiais escolares, de escritório, presentes, e uma grande variedade de utilidades para o lar. Preços competitivos e atendimento amigável.',
    shortDescription: 'Papelaria, presentes e utilidades para o lar.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Total+Bazar'
    },
    contact: {
      phone: '5511966665555',
      instagram: 'https://instagram.com/totalbazar',
    },
    photos: [
      '/images/total-bazar/file1.jpg',
      '/images/total-bazar/file2.jpg',
      '/images/total-bazar/file3.jpg',
      '/images/total-bazar/file4.jpg'
    ],
    reviews: [
      { rating: 5, comment: "Encontro de tudo lá, e o atendimento é ótimo!", author: "Ana L." }
    ]
  },
  {
    id: 5,
    name: 'Canto do Pet',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  }
];
