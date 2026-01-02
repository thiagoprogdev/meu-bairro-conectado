
import { Business } from '../types';

export const businesses: Business[] = [
  {
    id: 1,
    name: 'Padaria Alvorada',
    category: 'Padaria',
    description: 'Tradição em pães quentinhos e bolos artesanais desde 1995. Nosso café é moído na hora e temos o melhor pão de queijo da região.',
    shortDescription: 'Pães artesanais e café fresquinho todos os dias.',
    location: { mapsUrl: 'https://maps.google.com' },
    contact: { phone: '11999999999', instagram: 'https://instagram.com/padariaalvorada' },
    openingHours: '06:00 - 20:00',
    photos: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'],
    reviews: [{ author: 'Ricardo', rating: 5, comment: 'O pão na chapa é imbatível!' }]
  },
  {
    id: 2,
    name: 'Pet Shop Amigo',
    category: 'Pet Shop',
    description: 'Banho e tosa com carinho e produtos de primeira linha. Temos também consultório veterinário e acessórios exclusivos para seu pet.',
    shortDescription: 'Cuidado e carinho para seu melhor amigo.',
    location: { mapsUrl: 'https://maps.google.com' },
    contact: { phone: '11888888888', instagram: 'https://instagram.com/petshopamigo' },
    openingHours: '09:00 - 18:00',
    photos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80'],
    reviews: [{ author: 'Ana Paula', rating: 5, comment: 'Sempre cuidam muito bem do meu Thor.' }]
  },
  {
    id: 3,
    name: 'Mercado do Zé',
    category: 'Mercado',
    description: 'Frutas e legumes selecionados diariamente direto do produtor. Temos açougue próprio e entrega grátis para compras acima de R$ 50.',
    shortDescription: 'Hortifruti fresquinho e os melhores cortes de carne.',
    location: { mapsUrl: 'https://maps.google.com' },
    contact: { phone: '11777777777' },
    openingHours: '07:30 - 21:00',
    photos: ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'],
    reviews: [{ author: 'Marcos', rating: 4, comment: 'Preço justo e atendimento camarada.' }]
  }
];
