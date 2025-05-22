import { render, screen, fireEvent } from '@testing-library/react';
import HomeOrder from '@/app/_features/HomeOrder'; 
import '@testing-library/jest-dom';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HomeOrder Component', () => {
  beforeEach(() => {
    mockPush.mockClear(); 
  });

  it('renders CartItem and "Захиалах" button', () => {
    render(<HomeOrder />);
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
    expect(screen.getByText('Таны захиалга')).toBeInTheDocument();
    expect(screen.getByTestId('order-button')).toBeInTheDocument();
  });

  it('opens the AlertDialog when Захиалах button is clicked', () => {
    render(<HomeOrder />);
    fireEvent.click(screen.getByTestId('order-button'));
    expect(screen.getByText('Зааланд суух эсэх')).toBeInTheDocument();
  });

  it('selects dine-in and navigates to /', () => {
    render(<HomeOrder />);
    fireEvent.click(screen.getByTestId('order-button'));
    fireEvent.click(screen.getByTestId('radio-dinein'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('selects takeaway and navigates to /', () => {
    render(<HomeOrder />);
    fireEvent.click(screen.getByTestId('order-button'));
    fireEvent.click(screen.getByTestId('radio-takeaway'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('closes dialog via AlertDialogCancel', () => {
    render(<HomeOrder />);
    fireEvent.click(screen.getByTestId('order-button'));
    fireEvent.click(screen.getByTestId('close-dialog'));
  });
});
