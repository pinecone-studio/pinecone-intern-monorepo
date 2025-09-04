import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderedFoods } from '@/components/admin/order/OrderedFoods';

const item = [
  {
    orderId: '68b82b0176beab33f81bed0f',
    orderNumber: 14988,
    orderType: 'GO',
    status: 'READY',
    totalPrice: 300000,
    createdAt: '1756900097027',
    table: {
      tableName: '1b',
    },
    foodOrder: [
      {
        food: {
          foodName: 'Tuna Tostada',
          price: '21000',
          image: 'https://res.cloudinary.com/dfdpirnv5/image/upload/v1756618783/l0aoe9nvtcbxnnrsllh0.webp',
        },
        quantity: 2,
      },
      {
        food: {
          foodName: 'Sweet Donut',
          price: '4500',
          image: 'https://res.cloudinary.com/dfdpirnv5/image/upload/v1756619254/qcme5nh2mphsqctjkj2y.jpg',
        },
        quantity: 2,
      },
    ],
  },
];

describe('OrderContainer Component', () => {
  it('should render OrderedFoods', () => {
    const foodItem = item[0].foodOrder[0]; // pick the first food

    render(<OrderedFoods src={foodItem.food.image} price={foodItem.food.price} quantity={foodItem.quantity} foodName={foodItem.food.foodName} />);
  });
});
