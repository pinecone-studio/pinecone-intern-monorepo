import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RequestOtpDocument } from '@/generated';
import Confirm from '@/components/forgetpassword/Confirm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: RequestOtpDocument,
      variables: {
        input: {
          email: 'test@example.com',
          otp: '',
        },
      },
    },
    result: {
      data: {
        changePassword: {
          email: 'test@example.com',
        },
      },
    },
  },
  {
    request: {
      query: RequestOtpDocument,
      variables: {
        input: {
          email: 'test@example.com',
          otp: '1234',
        },
      },
    },
    result: {
      data: {
        changePassword: {
          email: 'test@example.com',
        },
      },
    },
  },
];

describe('Confirm Component', () => {
  beforeEach(() => {
    const mockGetItem = jest.fn().mockReturnValue(JSON.stringify({ email: 'test@example.com', otp: '' }));
    const mockSetItem = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('should retrieve email from localStorage and display it', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Confirm />
      </MockedProvider>
    );

    expect(localStorage.getItem).toHaveBeenCalledWith('forgetpassword');

    await waitFor(() => {
      expect(screen.getByText(/test@example.com/));
      expect(screen.getByText(/To continue, enter the secure code/));
    });
  });

  it('should update OTP and call the mutation on complete input', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Confirm />
      </MockedProvider>
    );

    const otpInputs = screen.getAllByTestId('Signup');

    // Simulate entering OTP
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '2' } });
    fireEvent.change(otpInputs[2], { target: { value: '3' } });
    fireEvent.change(otpInputs[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('forgetpassword', JSON.stringify({ email: 'test@example.com', otp: '1234' }));
    });
  });

  it('should trigger the OTP request mutation with the correct variables', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Confirm />
      </MockedProvider>
    );

    const otpInputs = screen.getAllByTestId('Signup');

    // Simulate entering OTP
    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '2' } });
    fireEvent.change(otpInputs[2], { target: { value: '3' } });
    fireEvent.change(otpInputs[3], { target: { value: '4' } });

    // Expect the mutation to be called with the correct variables
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('forgetpassword', JSON.stringify({ email: 'test@example.com', otp: '1234' }));
    });
  });
});
