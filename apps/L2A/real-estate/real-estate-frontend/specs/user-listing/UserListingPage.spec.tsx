import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserListingPage from '@/app/user-listing/page';

describe('UserListingPage', () => {
  it('renders title', () => {
    render(<UserListingPage />);
    expect(screen.getByText('Миний зарууд')).toBeInTheDocument();
  });

  it('shows all listings by default', () => {
    render(<UserListingPage />);
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    expect(within(tbody).getAllByRole('row')).toHaveLength(10);
  });

  it('filters listings by status when tab is clicked', () => {
    render(<UserListingPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Хадгалсан' }));
    const rowgroups = screen.getAllByRole('rowgroup');
    const tbody = rowgroups[1];
    expect(within(tbody).getAllByRole('row')).toHaveLength(2);
  });
});
