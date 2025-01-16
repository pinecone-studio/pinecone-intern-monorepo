import FoodCard from '@/components/common/FoodCard';
import { render } from '@testing-library/react';
const foodItems = { price: 15.6, title: 'Taco', img: './Taco.png' };

describe('FoodCard', () => {
  it('should render page', () => {
    render(<FoodCard title={foodItems.title} price={foodItems.price} img={foodItems.img} />);
  });
});
