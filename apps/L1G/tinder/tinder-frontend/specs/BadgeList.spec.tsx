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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders selected badges up to maxCount', () => {
    render(<BadgeList {...mockProps} />);

    expect(screen.getByTestId('badge-music')).toBeInTheDocument();
    expect(screen.getByTestId('badge-sports')).toBeInTheDocument();

    expect(screen.queryByTestId('badge-art')).not.toBeInTheDocument();
    expect(screen.queryByTestId('badge-food')).not.toBeInTheDocument();

    expect(screen.getByText('+ 2 more')).toBeInTheDocument();
  });

  it('calls clearExtraOptions when "+ more" XCircle is clicked', () => {
    render(<BadgeList {...mockProps} />);
    const xCircle = screen.getByText('+ 2 more').parentElement?.querySelector('svg');

    expect(xCircle).toBeInTheDocument();
    if (xCircle) {
      fireEvent.click(xCircle);
      expect(mockProps.clearExtraOptions).toHaveBeenCalledTimes(1);
    }
  });

  it('calls handleClear when clear button is clicked', () => {
    render(<BadgeList {...mockProps} />);
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.click(clearButton);
    expect(mockProps.handleClear).toHaveBeenCalledTimes(1);
  });
  it('renders IconComponent when option has icon', () => {
    const DummyIcon = ({ className }: { className?: string }) => <svg data-testid="dummy-icon" className={className} />;

    const propsWithIcon = {
      ...mockProps,
      selectedValues: ['music'],
      options: [{ value: 'music', label: 'Music', icon: DummyIcon }],
      maxCount: 1,
    };

    render(<BadgeList {...propsWithIcon} />);
    expect(screen.getByTestId('badge-music')).toBeInTheDocument();
    expect(screen.getByTestId('dummy-icon')).toBeInTheDocument();
  });
});
