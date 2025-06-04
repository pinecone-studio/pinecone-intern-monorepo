import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '@/app/_components/HeroSection';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HeroSection', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

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

  it('calls router.push with correct query when search button is clicked', () => {
    render(<HeroSection />);
    const input = screen.getByPlaceholderText('Хот, дүүрэг, эсвэл газар хайх...');
    fireEvent.change(input, { target: { value: 'Зайсан' } });
    const button = screen.getByRole('button', { name: /Хайх/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith(`/listing?search=${encodeURIComponent('Зайсан')}`);
  });
});
