import RenderFood from '@/app/HomePage/_components/RenderFoodCard';
import { render, screen } from '@testing-library/react';


const mockFood = {
  id: 1,
  name: 'Burger',
  price: '12',
  image: '/images/burger.png',
};

describe('RenderFood', () => {
  it('renders food details correctly', () => {
    render(<RenderFood food={mockFood} />);
    expect(screen.getByText(/Burger/i));
    expect(screen.getByText(/12k/));
    const img = screen.getByAltText('Burger') as HTMLImageElement;
    expect(img);
    expect(img.src);
  });

  it('has the correct data-testid attribute', () => {
    const { getByTestId } = render(<RenderFood food={mockFood} />);
    expect(getByTestId('food-card-1'));
  });
});
