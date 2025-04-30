import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/app/_components/Header';
import HomeSheet from '@/app/_components/Sheet';

describe('Header Component', () => {
  it('renders the Logo component', () => {
    render(<Header />);
    screen.getByTestId('Logo-image');
  });

  it('renders the shopping cart icon', () => {
    render(<Header />);
    screen.getByTestId('shopping-cart-icon');
  });

  it('renders the notification icon', () => {
    render(<Header />);
    screen.getByTestId('notification-icon');
  });

  it('renders the HomeSheet component', () => {
    render(<Header />);
    render(<HomeSheet />);
  });
});
