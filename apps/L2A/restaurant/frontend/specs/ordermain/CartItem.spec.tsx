import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '@/app/_components/CartItems';
import '@testing-library/jest-dom';

const mockItem = {
  image: '/Taco.png',
  name: 'Taco Taco',
  price: '15.6k',
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    render(<CartItem item={mockItem} />);

    expect(screen.getByText('Taco Taco')).toBeInTheDocument();
    expect(screen.getByText('15.6k')).toBeInTheDocument();
    expect(screen.getByAltText('Taco Taco')).toBeInTheDocument();
  });

  it('should render incresement and decreasement', () => {
    render(<CartItem item={mockItem} />);

    const plusButton = screen.getByText('+');
    const minusButton = screen.getByText('–');

    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not decrement below quantity of 1', () => {
    render(<CartItem item={mockItem} />);

    const minusButton = screen.getByText('–');

    fireEvent.click(minusButton); 
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<CartItem item={mockItem} onDelete={handleDelete} />);

    const deleteButton = screen.getByText('🗑️');
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
