import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from '@/generated';
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

jest.mock('@/generated', () => ({
  useGetProductsQuery: jest.fn(),
  useDeleteProductMutation: jest.fn(),
  useUpdateProductMutation: jest.fn(),
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

  it('edits an item and calls update mutation when save button is clicked', async () => {
    const mockRefetch = jest.fn();
    const mockUpdate = jest.fn().mockResolvedValue({});
    const mockDelete = jest.fn();

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockProducts },
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    (useUpdateProductMutation as jest.Mock).mockReturnValue([mockUpdate]);
    (useDeleteProductMutation as jest.Mock).mockReturnValue([mockDelete]);

    render(<AdminFoodList />);

    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button').filter((btn) => {
      return btn.querySelector('svg')?.getAttribute('data-icon') === null;
    });
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Хоол засах')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Хоолны нэр') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Shine Pizza' } });
    expect(nameInput.value).toBe('Shine Pizza');

    const priceInput = screen.getByPlaceholderText('Үнэ') as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: '20000₮' } });
    expect(priceInput.value).toBe('20000₮');

    const inactiveRadio = screen.getByLabelText('Идэвхигүй');
    fireEvent.click(inactiveRadio);

    const saveButton = screen.getByText('Хадгалах');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        variables: {
          input: {
            _id: '1',
            name: 'Shine Pizza',
            price: '20000₮',
            status: 'inactive',
          },
        },
      });
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
});
