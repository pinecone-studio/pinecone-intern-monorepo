import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectFilter } from '@/app/(admin)/_components/SelectFilter';
import { FilterHotelsAdmin } from '@/app/(admin)/hotels/_components/FilterHotelsAdmin';

describe('SelectFilter', () => {
  const mockItems = [
    { item: 'All Stars', value: 'all' },
    { item: '1 Star', value: '1' },
    { item: '2 Stars', value: '2' },
  ];

  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    render(<SelectFilter placeholder="Star Rating" items={mockItems} value="all" onValueChange={mockOnValueChange} dataTestId="star-rating-filter" />);
  });

  it('renders with placeholder when no value is selected', () => {
    render(<SelectFilter placeholder="Star Rating" items={mockItems} dataTestId="test-filter" />);
    expect(screen.getByText('Star Rating')).toBeInTheDocument();
  });

  it('displays selected item when value is provided', () => {
    expect(screen.getByText('All Stars')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    fireEvent.click(screen.getByTestId('star-rating-filter'));
    expect(screen.getByTestId('select-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-2')).toBeInTheDocument();
  });

  it('calls onValueChange when an item is selected', () => {
    fireEvent.click(screen.getByTestId('star-rating-filter'));
    fireEvent.click(screen.getByTestId('select-item-1'));
    expect(mockOnValueChange).toHaveBeenCalledWith('1');
  });

  it('closes dropdown when an item is selected', () => {
    fireEvent.click(screen.getByTestId('star-rating-filter'));
    fireEvent.click(screen.getByTestId('select-item-1'));
    expect(screen.queryByTestId('select-item-1')).not.toBeInTheDocument();
  });
  it('returns false for search match if hotel.name is undefined', () => {
    const onFilterChange = jest.fn();
    const hotelsWithUndefinedName = [{ _id: '3', name: undefined, starRating: 2, rating: 6.5 }];
    render(<FilterHotelsAdmin hotels={hotelsWithUndefinedName} onFilterChange={onFilterChange} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'test' } });
    expect(onFilterChange).toHaveBeenCalledWith([]);
  });
  it('closes dropdown when clicking outside', () => {
    fireEvent.click(screen.getByTestId('star-rating-filter'));
    fireEvent.click(screen.getByTestId('select-overlay'));
    expect(screen.queryByTestId('select-item-1')).not.toBeInTheDocument();
  });
});
