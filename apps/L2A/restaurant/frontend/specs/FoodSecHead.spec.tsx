import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import FoodSecHead from '@/app/admin/food/_features/FoodSecondHead';

// Mock GraphQL mutation
jest.mock('@/generated', () => ({
  useAddProductMutation: () => [jest.fn().mockResolvedValue({ data: { addProduct: { id: '1' } } })],
}));

describe('FoodSecHead component', () => {
  it('renders the component properly', () => {
    render(
      <MockedProvider>
        <FoodSecHead />
      </MockedProvider>
    );

    expect(screen.getByTestId('food-section-header')).toBeInTheDocument();
    expect(screen.getByTestId('food-title')).toHaveTextContent('Хоол');
    expect(screen.getByTestId('add-food-button')).toBeInTheDocument();
  });

  it('opens the dialog when "Хоол +" button is clicked', () => {
    render(
      <MockedProvider>
        <FoodSecHead />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('add-food-button'));
    expect(screen.getByTestId('food-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Хоол нэмэх');
  });

  it('can input food name, price, category, and status', () => {
    render(
      <MockedProvider>
        <FoodSecHead />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('add-food-button'));

    fireEvent.change(screen.getByTestId('food-name-input'), { target: { value: 'Burger' } });
    fireEvent.change(screen.getByTestId('price-input'), { target: { value: '3500' } });
    fireEvent.change(screen.getByTestId('category-input'), { target: { value: 'Fast Food' } });

    fireEvent.click(screen.getByTestId('inactive-radio'));

    expect(screen.getByTestId('food-name-input')).toHaveValue('Burger');
    expect(screen.getByTestId('price-input')).toHaveValue('3500');
    expect(screen.getByTestId('category-input')).toHaveValue('Fast Food');
  });
});
