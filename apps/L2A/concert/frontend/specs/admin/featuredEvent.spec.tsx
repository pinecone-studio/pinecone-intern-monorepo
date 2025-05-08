import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedEvent from '@/app/admin/_components/FeaturedEvent';

describe('FeaturedEvent Component', () => {
  it('renders the dialog trigger button', () => {
    render(<FeaturedEvent />);
    expect(screen.getByRole('button', { name: /edit profile/i })).toBeInTheDocument();
  });

  it('opens the dialog when the trigger button is clicked', () => {
    render(<FeaturedEvent />);
    const button = screen.getByRole('button', { name: /edit profile/i });
    fireEvent.click(button);
    expect(screen.getByText('Онцлох тоглолт болгох')).toBeInTheDocument();
  });

  it('shows radio group with "Тийм" and "Үгүй"', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(screen.getByLabelText('Тийм')).toBeInTheDocument();
    expect(screen.getByLabelText('Үгүй')).toBeInTheDocument();
  });

  it('shows input field for title', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(screen.getByPlaceholderText('Гарчиг оруулах')).toBeInTheDocument();
  });

  it('shows image upload area', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(screen.getByText('Зураг оруулах')).toBeInTheDocument();
  });

  it('renders save button inside the dialog', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    expect(screen.getByRole('button', { name: 'Хадгалах' })).toBeInTheDocument();
  });
});
