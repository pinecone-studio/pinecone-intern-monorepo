import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useCreateUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { AllSet } from '@/components/signup/Allset';

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AllSet Component', () => {
  let mockRouterPush: jest.Mock<any, any, any>;
  let mockCreateUserMutation: jest.Mock<any, any, any>;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockCreateUserMutation = jest.fn();

    useRouter.mockReturnValue({
      push: mockRouterPush,
    });

    useCreateUserMutation.mockReturnValue([mockCreateUserMutation]);
  });

  it('should render and handle the user creation', async () => {
    const savedData = JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
      age: 25,
      bio: 'Hello!',
      hobby: 'Reading',
      job: 'Developer',
      name: 'John Doe',
      profession: 'Engineer',
      interested: ['Technology', 'Sports'],
    });
    global.localStorage.setItem('signupFormData', savedData);

    const mockResponse = {
      data: { createUser: { success: true } },
    };
    mockCreateUserMutation.mockResolvedValue(mockResponse);

    render(<AllSet />);

    expect(screen.getByText('Upload your images'));

    fireEvent.click(screen.getByTestId('click'));

    await waitFor(() => {
      expect(mockCreateUserMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            password: 'password123',
            age: 25,
            bio: 'Hello!',
            hobby: 'Reading',
            interest: ['Technology', 'Sports'],
            job: 'Developer',
            username: 'John Doe',
            profession: 'Engineer',
          },
        },
      });

      expect(mockRouterPush).toHaveBeenCalledWith('/home');
    });
  });

  it('should handle missing saved data', async () => {
    global.localStorage.removeItem('signupFormData');

    render(<AllSet />);

    fireEvent.click(screen.getByTestId('click'));

    await waitFor(() => {
      expect(screen.getByText('No saved data found'));
    });
  });
});
