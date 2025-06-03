import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetProductsQuery } from '@/generated';
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

// Mock GraphQL hook
jest.mock('@/generated', () => ({
  useGetProductsQuery: jest.fn(),
}));

const mockProducts = [
  {
    _id: '1',
    name: 'Pizza',
    price: '15000₮',
    image: '/pizza.jpg',
    status: 'active',
  },
  {
    _id: '2',
    name: 'Burger',
    price: '12000₮',
    image: '/burger.jpg',
    status: 'inactive',
  },
];

describe('AdminFoodList', () => {
  it('shows loading state', () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<AdminFoodList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message', () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Failed to load' },
    });

    render(<AdminFoodList />);
    expect(screen.getByText(/Error loading products/i)).toBeInTheDocument();
  });

  it('renders food items correctly', async () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockProducts },
      loading: false,
      error: null,
    });

    render(<AdminFoodList />);

    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Burger')).toBeInTheDocument();
    });
  });

  it('deletes an item when delete button is clicked', async () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockProducts },
      loading: false,
      error: null,
    });

    render(<AdminFoodList />);

    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(deleteButtons[1]); // assuming delete is 2nd button after edit

    await waitFor(() => {
      expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
    });
  });

  it('updates name input inside dialog', async () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: [mockProducts[0]] },
      loading: false,
      error: null,
    });

    render(<AdminFoodList />);
  });
});
