import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentsTab from '../../src/app/comments/_components/CommentsTab';
 
describe('CommentsTab Component', () => {
  const mockProps = {
    allCount: 10,
    normalCount: 5,
    hiddenCount: 3,
    deletedCount: 2,
    handleAll: jest.fn(),
    handleNormal: jest.fn(),
    handleHidden: jest.fn(),
    handleDeleted: jest.fn(),
  };
 
  it('renders all buttons with correct text and count', () => {
    const { getByText } = render(<CommentsTab {...mockProps} />);
   
    expect(getByText('Бүгд')).toBeDefined();
    expect(getByText('Нуусан')).toBeDefined();
    expect(getByText('Устгасан')).toBeDefined();
    expect(getByText('Энгийн')).toBeDefined();
 
    expect(getByText('10')).toBeDefined();
    expect(getByText('3')).toBeDefined();
    expect(getByText('2')).toBeDefined();
    expect(getByText('5')).toBeDefined();
  });
 
  it('calls handleAll when "Бүгд" button is clicked', () => {
    const { getByText } = render(<CommentsTab {...mockProps} />);
    fireEvent.click(getByText('Бүгд'));
    expect(mockProps.handleAll).toHaveBeenCalledTimes(1);
  });
});