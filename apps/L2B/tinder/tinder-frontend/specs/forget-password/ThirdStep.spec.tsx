import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/forget-password/_components/ThirdStep';

describe('ThirdStep Component', () => {
  it('renders heading and instruction text', () => {
    render(<ThirdStep />);
    expect(screen.getByText(/Set new password/i)).toBeInTheDocument();
    expect(screen.getByText(/Use a minimum of 10 characters/i)).toBeInTheDocument();
  });

  it('renders two password input fields', () => {
    render(<ThirdStep />);
    const inputs = screen.getAllByPlaceholderText(/name@example.com/i);
    expect(inputs.length).toBe(2);
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  it('renders the Continue button', () => {
    render(<ThirdStep />);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('submits the form when the Continue button is clicked', () => {
    const { container } = render(<ThirdStep />);
    const form = container.querySelector('form');
    const handleSubmit = jest.fn((e) => e.preventDefault());

    form.onsubmit = handleSubmit;

    const button = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
