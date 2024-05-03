import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput from '../../src/app/sign-up/_components/TextInput';

describe('TextInput', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<TextInput name="test" label="Test Label" placeholder="Test Placeholder" type="text" value="" onChange={() => {}} />);
    expect(getByTestId('Custom-Input')).toBeDefine();
  });

  it('shows helper text when provided', () => {
    const { getByTestId } = render(<TextInput name="test" label="Test Label" placeholder="Test Placeholder" type="text" value="" onChange={() => {}} helperText="This is a helper text" />);
    expect(getByTestId('helperText')).toHaveTextContent('This is a helper text');
  });

  it('toggles password visibility when toggle button is clicked', () => {
    const { getByTestId } = render(<TextInput name="password" label="Password" placeholder="Enter Password" type="password" value="" onChange={() => {}} />);
    const toggleButton = getByTestId('toggleVisibility');
    const inputElement = getByTestId('Custom-Input').querySelector('input');

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<TextInput name="test" label="Test Label" placeholder="Test Placeholder" type="text" value="" onChange={handleChange} />);
    const inputElement = getByTestId('Custom-Input').querySelector('input');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onBlur handler when input loses focus', () => {
    const handleBlur = jest.fn();
    const { getByTestId } = render(<TextInput name="test" label="Test Label" placeholder="Test Placeholder" type="text" value="" onBlur={handleBlur} onChange={() => {}} />);
    const inputElement = getByTestId('Custom-Input').querySelector('input');

    fireEvent.blur(inputElement);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error styles and message when error is provided', () => {
    const { getByTestId, getByLabelText } = render(
      <TextInput name="test" label="Test Label" placeholder="Test Placeholder" type="text" value="" onChange={() => {}} error="This is an error message" />
    );
    const inputContainer = getByTestId('Custom-Input');
    const inputElement = getByLabelText('Test Label');

    expect(inputContainer).toHaveClass('border-red-700');
    expect(inputElement).toHaveClass('focus-within:border-red-700');
    expect(getByTestId('helperText')).toHaveTextContent('This is an error message');
  });
});
