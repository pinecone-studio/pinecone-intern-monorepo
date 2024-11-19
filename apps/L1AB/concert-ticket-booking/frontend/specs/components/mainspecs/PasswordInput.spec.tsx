import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordInput from '@/components/maincomponents/PasswordInput';

describe('PasswordInput', () => {
  it('should render successfully', () => {
    render(<PasswordInput id="password" label="Нууц үг:" dataCy="SignIn-Password-Input" />);

    // Verify the label is rendered
    const label = screen.getByText('Нууц үг:');
    expect(label).toBeInTheDocument();

    // Verify the input is rendered with initial type "password"
    const passwordInput = screen.getByLabelText('Нууц үг:');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Verify the toggle button is rendered
    const toggleButton = screen.getByRole('button', { name: /Show password/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle password visibility when the button is clicked', () => {
    const { getByTestId } = render(<PasswordInput id="password" label="Нууц үг:" dataCy="SignIn-Password-Input" />);

    const toggleButton = getByTestId('InputButton');
    fireEvent.click(toggleButton);
  });
});
