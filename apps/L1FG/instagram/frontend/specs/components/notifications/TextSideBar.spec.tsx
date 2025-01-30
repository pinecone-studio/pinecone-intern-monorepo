import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { useAuth } from '@/components/providers/AuthProvider';
import { TextSideBar } from '@/components/notifications/TextSideBar';

// Mock the useAuth hook
jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('TextSideBar Component', () => {
  const mockOnClick = jest.fn();
  const mockIcon = <span>🔍</span>; // Example icon for testing
  const mockText = 'Test User';
  const mockUser = { _id: '123' };

  beforeEach(() => {
    // Reset mocks before each test
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renders the text when isOpen and searchOpen are false', () => {
    render(<TextSideBar icon={mockIcon} text={mockText} isOpen={false} searchOpen={false} onClick={mockOnClick} />);

    // Check if the text is rendered
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it('does not render the text when isOpen or searchOpen is true', () => {
    render(<TextSideBar icon={mockIcon} text={mockText} isOpen={true} searchOpen={false} onClick={mockOnClick} />);

    // Check that the text is not rendered
    expect(screen.queryByText(mockText)).not.toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    render(<TextSideBar icon={mockIcon} text={mockText} isOpen={false} searchOpen={false} onClick={mockOnClick} />);

    // Simulate button click
    fireEvent.click(screen.getByTestId('text-side-bar-id'));

    // Check if the onClick function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
