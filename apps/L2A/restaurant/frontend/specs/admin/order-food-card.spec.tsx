import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderFoodCard from '@/app/admin/_components/OrderFoodCard';  
import orders from '@/app/admin/_components/orders.json';  

describe('OrderFoodCard', () => {
  it('renders orders from JSON correctly', () => {
    render(<OrderFoodCard orders={orders} />);

    expect(screen.getByText('Спартак')).toBeInTheDocument();
    expect(screen.getByText('10,5k')).toBeInTheDocument();
    expect(screen.getByText('1ш')).toBeInTheDocument();
    expect(screen.getByAltText('Спартак')).toBeInTheDocument();

    expect(screen.getByText('Чийз')).toBeInTheDocument();
    expect(screen.getByText('11k')).toBeInTheDocument();
    expect(screen.getByText('3ш')).toBeInTheDocument();
    expect(screen.getByAltText('Чийз')).toBeInTheDocument();

    expect(screen.getByText('Американо')).toBeInTheDocument();
    expect(screen.getByText('6,5k')).toBeInTheDocument();
    expect(screen.getByText('2ш')).toBeInTheDocument();
    expect(screen.getByAltText('Американо')).toBeInTheDocument();
  });

  it('renders multiple items correctly', () => {
    render(<OrderFoodCard orders={orders} />);

    const foodItems = screen.getAllByText(/k$/);  
    expect(foodItems.length);  
  });
});
