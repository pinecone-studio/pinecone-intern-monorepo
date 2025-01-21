import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessMessage from '@/components/success/Success';

describe('SuccessMessage Component', () => {
  test('renders with the default message', () => {
    render(<SuccessMessage />);
    const messageElement = screen.getByText('Амжилттай үүсгэлээ.');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-white');
  });

  test('renders with a custom message', () => {
    const customMessage = 'Custom success message!';
    render(<SuccessMessage message={customMessage} />);
    const messageElement = screen.getByText(customMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
