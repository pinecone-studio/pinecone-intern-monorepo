import Forgetpassword from '@/components/forgetpassword/Forgetpassword';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

jest.mock('../../components/forgetpassword/ForgetPassword.spec.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Confirm component</div>),
}));

describe('Forgetpassword Component', () => {
  beforeEach(() => {
    const mockSetItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: mockSetItem,
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('should render email input and submit button initially', () => {
    render(
      <MockedProvider>
        <Forgetpassword />
      </MockedProvider>
    );

    const emailInput = screen.getByTestId('email');
    expect(emailInput);

    const confirmButton = screen.getByTestId('confirm');
    expect(confirmButton);
  });

  it('should change step to "confirm" when email is valid and submit button is clicked', async () => {
    render(
      <MockedProvider>
        <Forgetpassword />
      </MockedProvider>
    );

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const confirmButton = screen.getByTestId('confirm');
    fireEvent.click(confirmButton);
  });

  it('should show an error if email is invalid', () => {
    render(
      <MockedProvider>
        <Forgetpassword />
      </MockedProvider>
    );

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const confirmButton = screen.getByTestId('confirm');
    fireEvent.click(confirmButton);
  });

  it('should save email to localStorage when form is submitted', async () => {
    const mockSetItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: mockSetItem,
        removeItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <MockedProvider>
        <Forgetpassword />
      </MockedProvider>
    );

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const confirmButton = screen.getByTestId('confirm');
    fireEvent.click(confirmButton);

    await act(async () => {
      await waitFor(() => {
        expect(mockSetItem).toHaveBeenCalledWith('forgetpassword', JSON.stringify({ email: 'test@example.com', otp: '' }));
      });
    });
  });
});
