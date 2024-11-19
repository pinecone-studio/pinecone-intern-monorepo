import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordInput from '@/components/maincomponents/PasswordInput';

describe('PasswordInput', () => {
  it('should render successfully', () => {
    render(<PasswordInput id="password" label="Нууц үг:" dataCy="SignIn-Password-Input" />);
  });

  it('should toggle password visibility when the button is clicked', () => {
    const { getByTestId } = render(<PasswordInput id="password" label="Нууц үг:" dataCy="SignIn-Password-Input" />);

    const toggleButton = getByTestId('InputButton');
    fireEvent.click(toggleButton);
  });
});
