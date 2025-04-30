import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/app/_components/Footer';

describe('Footer Component', () => {
  test('renders footer container with data-cy Button', () => {
    render(<Footer />);
  });

  test('renders inner button with correct text and styles', () => {
    render(<Footer />);
    const orderButton = screen.getByText('Захиалах');

    // Check text and class
    expect(orderButton.textContent).toBe('Захиалах');
    expect(orderButton.className).toContain('bg-[#441500]');
    expect(orderButton.className).toContain('text-[#FAFAFA]');
  });
});
