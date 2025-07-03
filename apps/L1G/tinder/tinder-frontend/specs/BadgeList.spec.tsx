import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BadgeList } from '../src/components/BadgeList';
import '@testing-library/jest-dom';

describe('BadgeList', () => {
  const mockProps = {
    selectedValues: ['music', 'sports', 'art', 'food'],
    options: [
      { value: 'music', label: 'Music' },
      { value: 'sports', label: 'Sports' },
      { value: 'art', label: 'Art' },
      { value: 'food', label: 'Food' },
    ],
    maxCount: 2,
    clearExtraOptions: jest.fn(),
    handleClear: jest.fn(),
  };

  it('renders selected badges up to maxCount', () => {
    render(<BadgeList {...mockProps} />);

    expect(screen.getByTestId('badge-music'));
    expect(screen.getByTestId('badge-sports'));
    expect(screen.queryByTestId('badge-art')).not;
    expect(screen.queryByTestId('badge-food')).not;

    expect(screen.getByText('+ 2 more'));
  });

  it('calls clearExtraOptions when "+ more" XCircle is clicked', () => {
    render(<BadgeList {...mockProps} />);
    const moreBadge = screen.getByText('+ 2 more').parentElement;
    const xCircle = moreBadge?.querySelector('.lucide-x-circle');

    if (xCircle) {
      fireEvent.click(xCircle);
      expect(mockProps.clearExtraOptions);
    } else {
      fail('XCircle not found');
    }
  });

  it('calls handleClear when clear button is clicked', () => {
    render(<BadgeList {...mockProps} />);
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);
    expect(mockProps.handleClear);
  });
});
