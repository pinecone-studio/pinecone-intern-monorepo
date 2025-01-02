import { render, screen, fireEvent, act } from '@testing-library/react';

import { AllSet } from '@/components/signup/Allset';

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn().mockReturnValue([jest.fn()]),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('AllSet Component', () => {
  test('should display the success message and button', () => {
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
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(<AllSet />);

    expect(screen.getByText('You re all set!'));
    expect(screen.getByText('Your account is all set. You re ready to explore and connect!'));
    expect(screen.getByText('Start Swiping!'));
  });

  test('should call createUser mutation and navigate on button click', async () => {
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
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(<AllSet />);

    const startButton = screen.getByText('Start Swiping!');

    fireEvent.click(startButton);
  });

  test('should show an error if no saved data is found', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(<AllSet />);

    const startButton = screen.getByText('Start Swiping!');

    fireEvent.click(startButton);

    expect(screen.getByText('No saved data found'));
  });

  test('should show an error if no saved data is found', async () => {
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

    render(<AllSet />);

    const startButton = screen.getByText('Start Swiping!');

    await act(async () => {
      fireEvent.click(startButton);
    });
  });
});
