export type FashionItem = {
  id: string;
  name: string;
  designer: string;
  price: number;
  image: string;
  category: 'male' | 'female';
  description: string;
  hint: string;
};

export type FashionEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  hint: string;
};

export type Transaction = {
  id: string;
  itemName: string;
  designer: string;
  price: number;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  image: string;
  hint: string;
};

export type TryOnHistoryItem = {
  id: string;
  garmentName: string;
  garmentImage: string;
  garmentHint: string;
  generatedImage: string;
  date: string;
};
