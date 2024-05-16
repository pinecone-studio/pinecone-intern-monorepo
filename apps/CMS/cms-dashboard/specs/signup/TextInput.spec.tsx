import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput from '@/app/sign-up/_components/TextInput';

describe('TextInput', () => {
  it('it should render with correct props', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<TextInput name="test" label="test" placeholder="test" value="test" error="test" onChange={mockFunction} onBlur={mockFunction} />);

    const date = getByTestId('label');

    const helperText = getByTestId('helperText');

    expect(date.textContent).toMatch('test');
    expect(helperText.textContent).toMatch('');
  });

  it('2. toggles password visibility when input type is password', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<TextInput name="test" label="test" placeholder="test" type="password" value="test" onChange={mockFunction} />);

    const passwordInput = getByTestId('Custom-Input').querySelector('input');
    const toggleButton = getByTestId('toggleVisibility');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('password');
  });
});
