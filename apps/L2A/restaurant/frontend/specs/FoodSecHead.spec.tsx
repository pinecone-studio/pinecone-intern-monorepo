import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodSecHead from '@/app/admin/food/_features/FoodSecondHead';

jest.mock('@/generated', () => ({
  useAddProductMutation: jest.fn(() => [jest.fn()]),
  useGetCategoriesQuery: jest.fn(() => ({
    data: {
      getCategories: [
        { _id: '1', name: 'Breakfast' },
        { _id: '2', name: 'Lunch' },
      ],
    },
  })),
}));

describe('FoodSecHead component', () => {
  it('renders title and button', () => {
    render(<FoodSecHead />);
    expect(screen.getByTestId('food-title')).toHaveTextContent('Хоол');
    expect(screen.getByTestId('add-food-button')).toBeInTheDocument();
  });

  it('opens dialog when button is clicked', () => {
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));
    expect(screen.getByTestId('food-dialog')).toBeInTheDocument();
  });

  it('shows image preview after uploading valid image', async () => {
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));

    const file = new File(['image content'], 'test.png', { type: 'image/png' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    // Simulate uploading
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.getByTestId('food-image-preview')).toBeInTheDocument();
    });
  });

  it('shows alert if required fields are missing', () => {
    window.alert = jest.fn();
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));
    fireEvent.click(screen.getByTestId('create-food-button'));
    expect(window.alert).toHaveBeenCalledWith('Бүх талбарыг бөглөнө үү.');
  });

  it('selects category correctly', () => {
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));
    fireEvent.click(screen.getByTestId('select-category-button'));
    fireEvent.click(screen.getByTestId('category-option-1'));
    expect(screen.getByTestId('select-category-button')).toHaveTextContent('Breakfast');
  });
});
