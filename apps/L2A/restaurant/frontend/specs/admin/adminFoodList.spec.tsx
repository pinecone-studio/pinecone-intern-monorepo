import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminFoodList from '@/app/admin/food/_features/AdminFoodList';

describe('AdminFoodList (dummy test)', () => {
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
  it('renders dialog content when edit button is clicked', () => {
    render(<AdminFoodList />);
    const editButton = screen.getByTestId('edit-button-0');
    fireEvent.click(editButton);
    const dialogTitle = screen.getByTestId('dialog-title');
    expect(dialogTitle).toBeVisible();
    expect(dialogTitle).toHaveTextContent('Хоол засах');
    expect(screen.getByTestId('food-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
    expect(screen.getByTestId('upload-image-button')).toBeInTheDocument();
  });
  it('renders food image for each card', () => {
    render(<AdminFoodList />);
    expect(screen.getAllByTestId(/food-image-/)).toHaveLength(2);
  });
});
