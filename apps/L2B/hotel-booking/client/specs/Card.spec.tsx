import Card from '@/app/_components/Card/Page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Card', () => {
  it('render Card component', () => {
    render(<Card />);
    expect(screen.getByTestId('card-component')).toBeInTheDocument();
  });
});
