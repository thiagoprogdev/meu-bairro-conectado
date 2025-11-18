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
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
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
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
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
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
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
    name: 'Vânia Marques confeitaria',
    category: 'Bolos e doces',
    description: 'Trabalhamos com bolos para festas e caseiros, doces, kit festa, bolo fatia e muito mais.',
    shortDescription: 'Bolos e doces para todas as ocasiões.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vânia+Marques+confeitaria'
    },
    contact: {
      phone: '5521984461269',
      instagram: 'https://instagram.com/marquesconft',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [
      '/images/vaniamarquesconfeitaria/logovania.jpeg',
      '/images/vaniamarquesconfeitaria/file1.jpeg',
      '/images/vaniamarquesconfeitaria/file2.jpeg',
      '/images/vaniamarquesconfeitaria/file3.jpeg',
      '/images/vaniamarquesconfeitaria/file4.jpeg',
      '/images/vaniamarquesconfeitaria/file5.jpeg',
      '/images/vaniamarquesconfeitaria/file6.jpeg',
      '/images/vaniamarquesconfeitaria/file7.jpeg',
      '/images/vaniamarquesconfeitaria/file8.jpeg',
      '/images/vaniamarquesconfeitaria/file9.jpeg'
    ],
    reviews: [
      { rating: 5, comment: "Que bolo maravilhoso, super recomendo!", author: "Ana L." }
    ]
  },
  {
    id: 5,
    name: 'Restaurante Luz da Alvorada',
    category: 'Restaurante',
    description: 'Restaurante com pratos variados e ambiente acolhedor, comida caseira e saborosa.',
    shortDescription: 'Restaurante com pratos variados e ambiente acolhedor.',
    location: {
      mapsUrl: 'https://maps.app.goo.gl/1zdCdCF1ab69RWy1A'
    },
    contact: {
      phone: '5521992644990',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [
      '/images/luz-da-alvorada/logoluzdaalvorada.jpeg',
      '/images/luz-da-alvorada/file1.jpeg',
      '/images/luz-da-alvorada/file2.jpeg',
      '/images/luz-da-alvorada/file3.jpeg',
      '/images/luz-da-alvorada/file4.jpeg'
    ],
    reviews: [
      { rating: 5, comment: "Melhor selfie service da região e ainda vem com sembremesa!", author: "Lucas M." }
    ]
  },
  {
    id: 6,
    name: 'Sua empresa aqui',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  },
  {
    id: 7,
    name: 'Sua empresa aqui',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  },
  {
    id: 8,
    name: 'Sua empresa aqui',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  },
  {
    id: 9,
    name: 'Sua empresa aqui',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  },
  {
    id: 10,
    name: 'Sua empresa aqui',
    category: 'Pet Shop',
    description: 'Cuidado completo para seu animal de estimação. Oferecemos banho e tosa, rações, acessórios e brinquedos. Tudo para o bem-estar do seu melhor amigo.',
    shortDescription: 'Banho, tosa, rações e acessórios para seu pet.',
    location: {
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canto+do+Pet'
    },
    contact: {
      phone: '5511955554444',
    },
    openingHours: 'Seg a Sáb: 09:00 às 18:00',
    photos: [], // Lista vazia para testar o placeholder
    reviews: [
      { rating: 5, comment: "Meu cachorro voltou cheiroso e feliz!", author: "Lucas M." }
    ]
  }
];
