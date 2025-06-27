import type { FashionItem, FashionEvent, Transaction, TryOnHistoryItem } from './types';

const fashionItems: FashionItem[] = [
  {
    id: '1',
    name: 'Asake Agbada',
    designer: 'Aso Ebi Creations',
    price: 85000,
    image: '/img/designs/male_style_1.jpg',
    category: 'male',
    description: 'A modern take on the classic Agbada, featuring intricate embroidery and luxurious fabric. Perfect for weddings and grand occasions.',
    hint: 'nigerian man',
  },
  {
    id: '2',
    name: 'Sokoto & Buba',
    designer: 'Adire Artistry',
    price: 45000,
    image: '/img/designs/male_style_2.jpg',
    category: 'male',
    description: 'A comfortable yet stylish Sokoto and Buba set, made from hand-dyed Adire fabric. Ideal for casual outings and cultural events.',
    hint: 'african print',
  },
  {
    id: '3',
    name: 'Senator Style',
    designer: 'Lagos Threads',
    price: 60000,
    image: '/img/designs/male_style_3.jpg',
    category: 'male',
    description: 'A sharp and sophisticated Senator suit, tailored to perfection. The clean lines and minimalist design make a powerful statement.',
    hint: 'man suit',
  },
  {
    id: '4',
    name: 'Kaftan Classic',
    designer: 'Kano Weaves',
    price: 55000,
    image: '/img/designs/male_style_4.jpg',
    category: 'male',
    description: 'An elegant and flowing Kaftan with subtle details. Crafted from breathable fabric for ultimate comfort and style.',
    hint: 'modern kaftan',
  },
  {
    id: '11',
    name: 'Senator Style',
    designer: 'Lagos Threads',
    price: 60000,
    image: '/img/designs/male_style_5.jpg',
    category: 'male',
    description: 'A sharp and sophisticated Senator suit, tailored to perfection. The clean lines and minimalist design make a powerful statement.',
    hint: 'man suit',
  },
  {
    id: '12',
    name: 'Kaftan Classic',
    designer: 'Kano Weaves',
    price: 55000,
    image: '/img/designs/male_style_6.jpg',
    category: 'male',
    description: 'An elegant and flowing Kaftan with subtle details. Crafted from breathable fabric for ultimate comfort and style.',
    hint: 'modern kaftan',
  },
  {
    id: '5',
    name: 'Ankara Peplum Dress',
    designer: 'Owanbe Glam',
    price: 95000,
    image: '/img/designs/ankara_1.jpg',
    category: 'female',
    description: 'A stunning Iro and Buba re-imagined as a modern gown. Features a vibrant Aso Oke gele and intricate beadwork.',
    hint: 'nigerian woman',
  },
  {
    id: '6',
    name: 'Diamond Water Dress',
    designer: 'Amy Aghomi',
    price: 38000,
    image: '/img/designs/water_design_1.png',
    category: 'female',
    description: 'Diamond, water and light put on by Mercy Eke during the recent AMVCA 11 gala in 2025. Dazzling everyone with styles designed by Amy Aghomi and styled by Maklin Scout ',
    hint: 'diamond dress',
  },
  {
    id: '7',
    name: 'Lace Bubu Gown',
    designer: 'Nigerian Elegance',
    price: 120000,
    image: '/img/designs/female_style_10.jpg',
    category: 'female',
    description: 'A luxurious and flowing Bubu gown made from delicate lace. Its ethereal quality makes it perfect for high-society events.',
    hint: 'lace dress',
  },
  {
    id: '8',
    name: 'Adire Jumpsuit',
    designer: 'Merry Loum',
    price: 42000,
    image: '/img/designs/female_style_11.jpg',
    category: 'female',
    description: 'A stylish and contemporary jumpsuit in a unique Adire pattern. The modern cut combined with traditional fabric creates a standout piece.',
    hint: 'adire jumpsuit',
  },
  {
    id: '9',
    name: 'Ankara Dress',
    designer: 'Abuja Vogue',
    price: 42000,
    image: '/img/designs/female_style_3.jpg',
    category: 'female',
    description: 'A stylish and contemporary dress in unique ankara pattern. The modern cut combined with traditional fabric creates a standout piece.',
    hint: 'ankara dress',
  },
  {
    id: '10',
    name: 'Ankara Short Dress',
    designer: 'Abuja Vogue',
    price: 49000,
    image: '/img/designs/female_style_9.jpg',
    category: 'female',
    description: 'A stylish and contemporary jumpsuit in a unique Adire pattern. The modern cut combined with traditional fabric creates a standout piece.',
    hint: 'Princess wardrobe',
  },
];

const fashionEvents: FashionEvent[] = [
  {
    id: '1',
    name: 'Lagos Fashion Week',
    date: 'October 26-29, 2024',
    location: 'Federal Palace Hotel, Lagos',
    image: '/img/events/lagos-fashion-week3.jpg',
    hint: 'fashion show',
  },
  {
    id: '2',
    name: 'GTCO Fashion Weekend',
    date: 'November 11-12, 2024',
    location: 'GTCentre, Lagos',
    image: '/img/events/gtb-fashion-week.jpg',
    hint: 'fashion event',
  },
  {
    id: '3',
    name: 'Arise Fashion Week',
    date: 'December 5-7, 2024',
    location: 'Eko Hotel, Lagos',
    image: '/img/events/arise-fashion-week.jpg',
    hint: 'fashion event',
  },
];

const transactions: Transaction[] = [
  {
    id: 'txn1',
    itemName: 'Lace Bubu Gown',
    designer: 'Yoruba Elegance',
    price: 120000,
    date: '2024-07-15',
    status: 'Delivered',
    image: 'https://placehold.co/400x600',
    hint: 'lace dress',
  },
  {
    id: 'txn2',
    itemName: 'Asake Agbada',
    designer: 'Aso Ebi Creations',
    price: 85000,
    date: '2024-07-10',
    status: 'Delivered',
    image: 'https://placehold.co/400x600',
    hint: 'nigerian man',
  },
    {
    id: 'txn3',
    itemName: 'Ankara Peplum Dress',
    designer: 'Ankara Royalty',
    price: 38000,
    date: '2024-07-20',
    status: 'Processing',
    image: 'https://placehold.co/400x600',
    hint: 'ankara dress',
  },
];

const tryOnHistory: TryOnHistoryItem[] = [
  {
    id: 'tryon1',
    garmentName: 'Ankara Peplum Dress',
    garmentImage: 'https://placehold.co/400x600',
    garmentHint: 'ankara dress',
    generatedImage: 'https://placehold.co/400x400',
    date: '2024-07-21',
  },
  {
    id: 'tryon2',
    garmentName: 'Senator Style',
    garmentImage: 'https://placehold.co/400x600',
    garmentHint: 'man suit',
    generatedImage: 'https://placehold.co/400x400',
    date: '2024-07-18',
  },
];


export const getFashionItems = () => fashionItems;

export const getFashionItemById = (id: string) => {
  return fashionItems.find((item) => item.id === id);
};

export const getFashionEvents = () => fashionEvents;

export const getTransactions = () => transactions;

export const getTryOnHistory = () => tryOnHistory;
