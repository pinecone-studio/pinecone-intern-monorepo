export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  table: string;
  createdAt: string;
  items: OrderItem[];
  status: 'waiting' | 'in-progress' | 'completed';
  totalPrice: number;
};

const cloudinaryBaseUrl = 'https://res.cloudinary.com/dcchyvdpt/image/upload/';

export const mockOrderDetails: Order = {
  id: 'order_33999',
  table: '1B',
  createdAt: '2025-04-28T12:45:00Z',
  items: [
    {
      id: 'item_1',
      name: 'Taco',
      price: 15600,
      quantity: 2,
      image: `${cloudinaryBaseUrl}v1615550891/taco.jpg`,
    },
    {
      id: 'item_2',
      name: 'Taco',
      price: 15600,
      quantity: 2,
      image: `${cloudinaryBaseUrl}v1615550891/taco.jpg`,
    },
    {
      id: 'item_3',
      name: 'Taco',
      price: 15600,
      quantity: 2,
      image: `${cloudinaryBaseUrl}v1615550891/taco.jpg`,
    },
  ] as OrderItem[],
  status: 'waiting',
  totalPrice: 25900,
};
