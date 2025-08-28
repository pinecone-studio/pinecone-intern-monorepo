import { Header } from '@/components/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByAltText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Messages/i)).toBeInTheDocument();
  });

  it('navigates to profile when profile button is clicked', () => {
    render(<Header />);
    
    const profileButton = screen.getByAltText(/Profile Picture/i).closest('button');
    fireEvent.click(profileButton!);
    
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });
});