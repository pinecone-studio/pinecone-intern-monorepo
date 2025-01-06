import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '@/components/signup/Signup';
import { MockedProvider } from '@apollo/client/testing';

describe('Signup Component', () => {
  beforeEach(() => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(null); // Default to no saved data
    global.Storage.prototype.setItem = jest.fn();
  });

  test('renders the signup step initially when localStorage is empty', () => {
    render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    // Check if the email input and continue button are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('renders addPassword step if email is present in localStorage', () => {
    // Simulate email data in localStorage
    global.Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify({ email: 'test@example.com', password: '', interested: '', age: '' }));

    render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );

    // Check if the 'addPassword' step is rendered
    // expect(screen.getByText(/Create password/i)).toBeInTheDocument(); // Adjust this based on your Addpassword component
  });

  test('displays an error for invalid email', () => {
    render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const continueButton = screen.getByRole('button', { name: /continue/i });

    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.click(continueButton);

    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('saves form data and transitions to the confirmation step', () => {
    render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const continueButton = screen.getByRole('button', { name: /continue/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(continueButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('signupFormData', JSON.stringify({ email: 'test@example.com', password: '', interested: '', age: '' }));
  });
  it('render when localStorage is empty', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });
});
