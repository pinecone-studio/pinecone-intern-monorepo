// HomePageHero.test.tsx
import HomePageHero from '@/components/HomePage/HomePage';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string; priority: boolean }) => <img src={src} alt={alt} data-testid="hero-image" />,
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HomePageHero', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockPush.mockClear();
  });

  it('should render successfully', () => {
    render(<HomePageHero />);
    expect(screen.getByTestId('hero-image')).toBeInTheDocument();
  });

  it('should render the hero image with correct props', () => {
    render(<HomePageHero />);
    const image = screen.getByTestId('hero-image');

    expect(image).toHaveAttribute('src', '/cover.png');
    expect(image).toHaveAttribute('alt', 'Background');
  });

  it('should render the main heading', () => {
    render(<HomePageHero />);
    const heading = screen.getByText('Танд таалагдах газраа олцгооё.');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-6xl', 'text-white', 'font-bold');
  });

  it('should render search input with correct placeholder', () => {
    render(<HomePageHero />);
    const input = screen.getByPlaceholderText('Өөрийн хайж буй хотхон болон хаягаа оруулна уу');
    expect(input).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<HomePageHero />);
    const button = screen.getByText('Хайх');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-orange-500', 'text-white');
  });

  it('should update search value when typing', () => {
    render(<HomePageHero />);
    const input = screen.getByPlaceholderText('Өөрийн хайж буй хотхон болон хаягаа оруулна уу');

    fireEvent.change(input, { target: { value: 'Test Search' } });
    expect(input).toHaveValue('Test Search');
  });

  it('should navigate with search value when clicking search button', () => {
    render(<HomePageHero />);
    const input = screen.getByPlaceholderText('Өөрийн хайж буй хотхон болон хаягаа оруулна уу');
    const button = screen.getByText('Хайх');

    // Type in search value
    fireEvent.change(input, { target: { value: 'Test Location' } });

    // Click search button
    fireEvent.click(button);

    // Verify navigation
    expect(mockPush).toHaveBeenCalledWith('estates/?searchValue=Test Location');
  });

  it('should handle empty search value', () => {
    render(<HomePageHero />);
    const button = screen.getByText('Хайх');

    // Click search button without entering value
    fireEvent.click(button);

    // Should still navigate but with empty search value
    expect(mockPush).toHaveBeenCalledWith('estates/?searchValue=');
  });

  it('should have correct layout classes', () => {
    const { container } = render(<HomePageHero />);
    const mainDiv = container.firstChild as HTMLElement;

    expect(mainDiv).toHaveClass('relative', 'h-[560px]', 'w-screen', 'flex', 'flex-col', 'items-center', 'justify-center');
  });

  it('should have proper overlay with backdrop filter', () => {
    render(<HomePageHero />);
    const overlay = screen.getByText('Танд таалагдах газраа олцгооё.').parentElement;

    expect(overlay).toHaveClass('absolute', 'inset-0', 'backdrop-brightness-50');
  });
});
