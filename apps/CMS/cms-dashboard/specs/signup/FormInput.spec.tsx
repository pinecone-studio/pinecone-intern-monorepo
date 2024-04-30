import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FormInput } from '../../src/app/sign-up/_components';

describe('ArticlesCard', () => {
  it('1. it should render with correct props', () => {
    const { getByTestId } = render(<FormInput label="2024.04.15" helperText="Morphosis" />);

    const date = getByTestId('label');

    const title = getByTestId('helperText');

    expect(date.textContent).toMatch('2024.04.15');
    expect(title.textContent).toMatch('Morphosis');
  });

  it('2. toggles password visibility when input type is password', () => {
    const { getByTestId } = render(<FormInput label="Password" type="password" helperText="Enter your password" />);

    const passwordInput = getByTestId('Custom-Input').querySelector('input');
    const toggleButton = getByTestId('toggleVisibility');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('password');
  });
});
