import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

describe('AdminFoodList (dummy uptade dialog)', () => {
  it('renders the food list container', () => {
    render(<AdminFoodList />);
    expect(screen.getByTestId('food-list')).toBeInTheDocument();
  });
  it('renders 2 food cards', () => {
    render(<AdminFoodList />);
    expect(screen.getAllByTestId(/food-card-/)).toHaveLength(2);
  });
  it('renders edit and delete buttons for each card', () => {
    render(<AdminFoodList />);
    expect(screen.getAllByTestId(/edit-button-/)).toHaveLength(2);
    expect(screen.getAllByTestId(/delete-button-/)).toHaveLength(2);
  });
  it('renders food image for each card', () => {
    render(<AdminFoodList />);
    expect(screen.getAllByTestId(/food-image-/)).toHaveLength(2);
  });
});
