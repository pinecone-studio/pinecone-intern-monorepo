import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/app/_components/Header';
import HomeSheet from '@/app/_components/Sheet';

describe('Header Component', () => {
  it('renders the Logo component', () => {
    render(<Header />);
    screen.getByTestId('Logo-image');
    screen.getByTestId('shopping-cart-icon');
    screen.getByTestId('notification-icon');
    render(<Header />);
    render(<HomeSheet />);
  });
});
