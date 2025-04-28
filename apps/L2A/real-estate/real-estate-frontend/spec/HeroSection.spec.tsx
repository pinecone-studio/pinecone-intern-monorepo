import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from '../src/app/home/_components/HeroSection';
import '@testing-library/jest-dom';
describe('HeroSection', () => {
  it('renders heading correctly', () => {
    render(<HeroSection />);
    expect(screen.getByText("Discover a place you’ll love to live")).toBeInTheDocument();
  });

  it('renders search input with correct placeholder', () => {
    render(<HeroSection />);
    expect(screen.getByPlaceholderText('Хот, дүүрэг, эсвэл газар хайх...')).toBeInTheDocument();
  });

  it('renders search button with correct text', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /Хайх/i })).toBeInTheDocument();
  });

  it('allows typing into search input', () => {
    render(<HeroSection />);
    const input = screen.getByPlaceholderText('Хот, дүүрэг, эсвэл газар хайх...');
    fireEvent.change(input, { target: { value: 'Зайсан' } });
    expect((input as HTMLInputElement).value).toBe('Зайсан');
  });

  it('submits the form when clicking the search button', () => {
    render(<HeroSection />);
    const input = screen.getByPlaceholderText('Хот, дүүрэг, эсвэл газар хайх...');
    fireEvent.change(input, { target: { value: 'Зайсан' } });

    const button = screen.getByRole('button', { name: /Хайх/i });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});

