import React from 'react';
import { render } from '@testing-library/react';
import { Navbar } from '../../src/app/dashboard/_components/Navbar';

describe('Navbar test', () => {
  it('1. Should render navbar component', () => {
    const { getByTestId } = render(<Navbar />);
    const buttonElement = getByTestId('navbar');
    expect(buttonElement).toBeDefined();
  });
});
