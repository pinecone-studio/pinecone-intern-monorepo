import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from '@/components/maincomponents/FormInput';

describe('FormInput', () => {
  it('should render the FormInput with the correct props', () => {
    render(<FormInput id="email" label="Имэйл хаяг" type="email" placeholder="name@example.com" dataCy="SignIn-Email-Input" />);

    const label = screen.getByText('Имэйл хаяг');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');

    const input = screen.getByPlaceholderText('name@example.com');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('data-cy', 'SignIn-Email-Input');
  });

  it('should use the default type of "text" when no type is provided', () => {
    render(<FormInput id="username" label="Хэрэглэгчийн нэр" placeholder="Your username" dataCy="SignIn-Username-Input" type="hi" />);

    const input = screen.getByPlaceholderText('Your username');
    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute('id', 'username');
    expect(input).toHaveAttribute('data-cy', 'SignIn-Username-Input');
  });

  it('should override the type if explicitly provided', () => {
    render(<FormInput id="password" label="Нууц үг" type="password" placeholder="Your password" dataCy="SignIn-Password-Input" />);

    const input = screen.getByPlaceholderText('Your password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password'); // Verifies the provided type
    expect(input).toHaveAttribute('id', 'password');
    expect(input).toHaveAttribute('data-cy', 'SignIn-Password-Input');
  });
});
