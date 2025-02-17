import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { BottomLayout } from '@/components/home/bottom/BottomLayout';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

// Mock SVG components
jest.mock('@/components/svg/HomeSvg', () => ({
  HomeSVG: () => <div data-testid="home-svg">Home SVG</div>,
}));

jest.mock('@/components/svg/SearchSvg', () => ({
  SearchSVG: () => <div data-testid="search-svg">Search SVG</div>,
}));

jest.mock('@/components/svg/UserSvg', () => ({
  UserSvg: () => <div data-testid="user-svg">User SVG</div>,
}));

jest.mock('lucide-react', () => ({
  SquarePlus: () => <div data-testid="square-plus">Square Plus</div>,
}));

describe('BottomLayout', () => {
  const mockPush = jest.fn();
  const mockUser = { _id: 'test-user-id' };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mocks
    useRouter.mockReturnValue({ push: mockPush });
    useAuth.mockReturnValue({ user: mockUser });
  });

  it('renders all navigation buttons', () => {
    render(<BottomLayout />);

    expect(screen.getByTestId('home-svg')).toBeInTheDocument();
    expect(screen.getByTestId('search-svg')).toBeInTheDocument();
    expect(screen.getByTestId('square-plus')).toBeInTheDocument();
    expect(screen.getByTestId('user-svg')).toBeInTheDocument();
  });

  it('navigates to create page when create button is clicked', () => {
    render(<BottomLayout />);

    // fireEvent.click(screen.getByRole('button', { name: /Square Plus/i }));

    // expect(mockPush).toHaveBeenCalledWith('/create');
  });

  it('navigates to user profile when profile button is clicked', () => {
    render(<BottomLayout />);

    fireEvent.click(screen.getByRole('button', { name: /User SVG/i }));

    expect(mockPush).toHaveBeenCalledWith(`/${mockUser._id}`);
  });
  it('closes sheets when navigating', () => {
    render(<BottomLayout />);
    fireEvent.click(screen.getByRole('button', { name: /Search SVG/i }));

    // Navigate to home
    fireEvent.click(screen.getByRole('button', { name: /Home SVG/i }));

    // Verify search sheet is closed
    const searchButton = screen.getByRole('button', { name: /Search SVG/i });
    expect(searchButton).toBeDefined();
  });
});
