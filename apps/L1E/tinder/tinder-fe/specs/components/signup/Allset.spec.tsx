import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useCreateUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { AllSet } from '@/components/signup/Allset';

// Mock the useCreateUserMutation hook
jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AllSet Component', () => {
  const mockCreateUser = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset mock functions before each test
    mockCreateUser.mockClear();
    mockPush.mockClear();
    (useCreateUserMutation as jest.Mock).mockReturnValue([mockCreateUser]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock localStorage for testing purposes
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(
          JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
            age: '25',
            bio: 'This is my bio',
            hobby: 'Reading',
            job: 'Developer',
            name: 'Test User',
            profession: 'Software Engineer',
            interested: 'Technology',
          })
        ),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('should display the success message and button', () => {
    render(<AllSet />);

    // Check if success message is displayed
    expect(screen.getByText("You're all set!"));
    expect(screen.getByText("Your account is all set. You're ready to explore and connect!"));
    expect(screen.getByText('Start Swiping!'));
  });

  test('should call createUser mutation and navigate on button click', async () => {
    render(<AllSet />);

    const startButton = screen.getByText('Start Swiping!');

    // Simulate button click
    fireEvent.click(startButton);

    await waitFor(() => {
      // Check if createUser was called with the correct variables
      expect(mockCreateUser).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            password: 'password123',
            age: '25',
            bio: 'This is my bio',
            hobby: 'Reading',
            interest: 'Technology',
            job: 'Developer',
            username: 'Test User',
            profession: 'Software Engineer',
          },
        },
      });

      // Check if the router.push function is called to navigate to '/home'
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });

  test('should show an error if no saved data is found', async () => {
    // Modify localStorage to simulate no saved data
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(<AllSet />);

    const startButton = screen.getByText('Start Swiping!');

    // Simulate button click
    fireEvent.click(startButton);

    // Check if error message is displayed
    expect(screen.getByText('No saved data found'));
  });
});
