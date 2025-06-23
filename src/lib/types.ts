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
