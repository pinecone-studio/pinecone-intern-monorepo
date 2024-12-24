import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/generated';
import { ImageUpload } from '@/components/signup/ImageUpload';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useCreateUserMutation: jest.fn(),
}));

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ImageUpload Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('handles form submission', async () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const mockCreateUser = jest.fn().mockResolvedValue({});
    (useCreateUserMutation as jest.Mock).mockReturnValue([mockCreateUser]);

    localStorage.setItem(
      'signupFormData',
      JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        age: 25,
        bio: 'Test bio',
        hobby: 'Reading',
        interested: 'Women',
        job: 'Developer',
        name: 'Test User',
        profession: 'Software Engineer',
      })
    );

    render(<ImageUpload />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            password: 'password123',
            age: 25,
            bio: 'Test bio',
            hobby: 'Reading',
            interest: 'Women',
            job: 'Developer',
            username: 'Test User',
            profession: 'Software Engineer',
          },
        },
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/home');
    });
  });

  it('displays error message when form submission fails', async () => {
    const mockCreateUser = jest.fn().mockRejectedValue(new Error('Submission failed'));
    (useCreateUserMutation as jest.Mock).mockReturnValue([mockCreateUser]);

    localStorage.setItem(
      'signupFormData',
      JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    render(<ImageUpload />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Error creating user'));
    });
  });

  it('displays error when no saved data is found', async () => {
    render(<ImageUpload />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('No saved data found'));
    });
  });
});
