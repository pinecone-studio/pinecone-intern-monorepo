import { render, screen, fireEvent } from '@testing-library/react';
import FoodSecHead from '@/app/admin/food/_features/FoodSecondHead';
import '@testing-library/jest-dom';
describe('FoodSecHead component', () => {
  it('renders header title', () => {
    render(<FoodSecHead />);
    expect(screen.getByTestId('food-title')).toHaveTextContent('Хоол');
  });
  it('opens and closes the dialog', () => {
    render(<FoodSecHead />);
    const addButton = screen.getByTestId('add-food-button');
    fireEvent.click(addButton);
    expect(screen.getByTestId('food-dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  });
  it('shows an alert if required fields are missing', () => {
    window.alert = jest.fn();
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));
    fireEvent.click(screen.getByTestId('create-food-button'));
    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields and upload an image.');
  });
  it('updates food name, price, and status', () => {
    render(<FoodSecHead />);
    fireEvent.click(screen.getByTestId('add-food-button'));
    const foodNameInput = screen.getByTestId('food-name-input');
    fireEvent.change(foodNameInput, { target: { value: 'Pizza' } });
    expect(foodNameInput).toHaveValue('Pizza');
    const priceInput = screen.getByTestId('price-input');
    fireEvent.change(priceInput, { target: { value: '5000' } });
    expect(priceInput).toHaveValue('5000');
    const inactiveRadio = screen.getByTestId('inactive-radio');
    fireEvent.click(inactiveRadio);
    expect(inactiveRadio).toBeChecked();
  });
});
