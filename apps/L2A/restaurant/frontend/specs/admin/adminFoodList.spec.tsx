import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetProductsQuery, useDeleteProductMutation } from '@/generated';
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

jest.mock('@/generated', () => ({
  useGetProductsQuery: jest.fn(),
  useDeleteProductMutation: jest.fn(),
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes an item when delete button is clicked', async () => {
    const mockRefetch = jest.fn();
    const mockDelete = jest.fn().mockResolvedValue({});

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockProducts },
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    (useDeleteProductMutation as jest.Mock).mockReturnValue([mockDelete]);

    render(<AdminFoodList />);

    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Burger')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button').filter((btn) => btn.querySelector('svg')?.getAttribute('data-icon') !== 'pencil');
    fireEvent.click(deleteButtons[1]);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith({
        variables: { input: { _id: '1' } },
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
    });
  });
});
