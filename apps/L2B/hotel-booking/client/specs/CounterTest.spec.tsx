import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestCounter from '@/app/(main)/_components/TestCounter';

describe('CounterTestComponent', () => {
  test('renders with initial count and increments/decrements correctly', () => {
    const { getByTestId } = render(<TestCounter />);

    const count = getByTestId('count');
    const incrementButton = getByTestId('increment');
    const decrementButton = getByTestId('decrement');

    // Initial count
    expect(count).toHaveTextContent('1');

    // Increment
    fireEvent.click(incrementButton);
    expect(count).toHaveTextContent('2');

    // Decrement
    fireEvent.click(decrementButton);
    expect(count).toHaveTextContent('1');
  });
});
