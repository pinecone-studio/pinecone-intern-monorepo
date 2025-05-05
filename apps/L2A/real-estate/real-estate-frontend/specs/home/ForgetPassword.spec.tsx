import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import ForgetPassword from '@/app/forget-password/_components/ForgetPassword';

describe('ForgetPassword Component', () => {
  beforeEach(() => {
    render(<ForgetPassword />);
  });

  const getEmailInput = () => screen.getByTestId('email-input');

  const getSubmitButton = () => screen.getByTestId('submit-button');

  test('renders heading, email input, and submit button', () => {
    expect(screen.getByText(/forget password/i)).toBeInTheDocument();

    expect(getEmailInput()).toBeInTheDocument();

    expect(getSubmitButton()).toBeInTheDocument();
  });

  test('displays an error when submitting empty form', async () => {
    await userEvent.click(getSubmitButton());

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('shows success message after valid email submission', async () => {
    await userEvent.clear(getEmailInput());

    await userEvent.type(getEmailInput(), 'test@example.com');

    expect((getEmailInput() as HTMLInputElement).value).toBe('test@example.com');

    await userEvent.click(getSubmitButton());

    expect(await screen.findByText(/a reset link has been sent/i)).toBeInTheDocument();
  });

  test('placeholder test for loading state', async () => {
    expect(true).toBe(true);
  });
});
