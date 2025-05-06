import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeOrder from '@/app/_features/HomeOrder';
import '@testing-library/jest-dom';


describe('HomeOrder', () => {
  it('should render the order title and passes product to CartItem', () => {
    render(<HomeOrder />);

    expect(screen.getByText('Таны захиалга')).toBeInTheDocument();
    expect(screen.getByText('Taco Taco')).toBeInTheDocument();
    expect(screen.getByText('15.6k')).toBeInTheDocument();
    expect(screen.getByAltText('Taco Taco')).toBeInTheDocument();
  });
});
