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
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
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

  it('shows error when trying to save with empty title', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));
    const saveButton = screen.getByRole('button', { name: 'Хадгалах' });
    fireEvent.click(saveButton);
    expect(screen.getByText('Гарчиг шаардлагатай')).toBeInTheDocument();
  });

  it('saves successfully when title is valid and closes dialog', async () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    const input = screen.getByPlaceholderText('Гарчиг оруулах');
    fireEvent.change(input, { target: { value: 'My Event' } });

    const saveButton = screen.getByRole('button', { name: 'Хадгалах' });
    fireEvent.click(saveButton);

    await new Promise((r) => setTimeout(r, 1100));

    expect(screen.queryByText('Онцлох тоглолт болгох')).not.toBeInTheDocument();
  });

  it('closes the dialog when the close button is clicked', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Онцлох тоглолт болгох')).not.toBeInTheDocument();
  });

  it('contains hidden file input for image upload', () => {
    render(<FeaturedEvent />);
    fireEvent.click(screen.getByRole('button', { name: /edit profile/i }));

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();
  });
});
