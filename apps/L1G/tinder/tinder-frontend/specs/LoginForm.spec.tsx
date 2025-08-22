import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LoginForm } from '@/components/Login';
import { MockedProvider } from '@apollo/client/testing';
import { LoginDocument } from '@/generated';
import '@testing-library/jest-dom';

// Mocks
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: mockPush }) }));

const localStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test data
const successMock = {
  request: {
    query: LoginDocument,
    variables: { email: 'test@example.com', password: 'password123' },
  },
  result: { data: { login: 'mock-token' } },
};

const noTokenMock = {
  request: {
    query: LoginDocument,
    variables: { email: 'test@example.com', password: 'password123' },
  },
  result: { data: { login: null } },
};

const errorMock = {
  request: {
    query: LoginDocument,
    variables: { email: 'test@example.com', password: 'wrongpassword' },
  },
  error: new Error('Invalid credentials'),
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  const renderForm = (mocks = []) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginForm />
      </MockedProvider>
    );

  const fillForm = async (email: string, password: string) => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('name@example.com'), { target: { value: email } });
      fireEvent.change(screen.getByPlaceholderText('Please enter your password'), { target: { value: password } });
      fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    });
  };

  it('handles successful login with token', async () => {
    renderForm([successMock]);
    await fillForm('test@example.com', 'password123');
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });

  it('handles missing token case', async () => {
    renderForm([noTokenMock]);
    await fillForm('test@example.com', 'password123');
    await waitFor(() => {
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('shows validation errors', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    });
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('handles login errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    renderForm([errorMock]);
    await fillForm('test@example.com', 'wrongpassword');
    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Login error'));
    consoleSpy.mockRestore();
  });

  it('navigates to forgot password', async () => {
    renderForm();
    await act(async () => {
      fireEvent.click(screen.getByText(/Forgot Password\?/i));
    });
    expect(mockPush).toHaveBeenCalledWith('/forgot-password');
  });
});
