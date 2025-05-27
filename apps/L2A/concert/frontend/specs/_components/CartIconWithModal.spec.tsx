import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useBooking } from '@/app/_components/context/BookingContext';
import { CartIconWithModal } from '@/app/_components/CartIconWithModal';

jest.mock('./../../src/app/_components/context/BookingContext.tsx', () => ({
  ...jest.requireActual('./../../src/app/_components/context/BookingContext.tsx'),
  useBooking: jest.fn(),
}));

describe('CartIconWithModal', () => {
  const mockClearBooking = jest.fn();
  const mockUseBooking = {
    booking: null,
    clearBooking: mockClearBooking,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useBooking as jest.Mock).mockReturnValue(mockUseBooking);
  });

  it('should render the cart icon', () => {
    render(<CartIconWithModal />);
    expect(screen.getByLabelText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show notification badge when there is a booking', () => {
    (useBooking as jest.Mock).mockReturnValue({
      ...mockUseBooking,
      booking: { concertName: 'Test Concert' },
    });

    render(<CartIconWithModal />);
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('should not show notification badge when there is no booking', () => {
    render(<CartIconWithModal />);
    expect(screen.queryByText('!')).not.toBeInTheDocument();
  });

  it('should open modal when cart icon is clicked', () => {
    render(<CartIconWithModal />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    expect(screen.getByText('Миний тасалбарууд')).toBeInTheDocument();
  });

  it('should pass booking data to modal when exists', () => {
    const testBooking = {
      concertName: 'Test Concert',
      date: '2023-12-31',
      tickets: [{ type: 'VIP', count: 1, price: 50000 }],
      totalPrice: 50000,
    };

    (useBooking as jest.Mock).mockReturnValue({
      ...mockUseBooking,
      booking: testBooking,
    });

    render(<CartIconWithModal />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    expect(screen.getByText(testBooking.concertName)).toBeInTheDocument();
  });

  it('should show empty state when no booking exists', () => {
    render(<CartIconWithModal />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    expect(screen.getByText('Тасалбар байхгүй байна')).toBeInTheDocument();
  });

  it('should close modal when onClose is called', () => {
    render(<CartIconWithModal />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(screen.queryByText('Миний тасалбарууд')).not.toBeInTheDocument();
  });

  it('should call clearBooking when clear button is clicked', () => {
    const testBooking = {
      concertName: 'Test Concert',
      date: '2023-12-31',
      tickets: [{ type: 'VIP', count: 1, price: 50000 }],
      totalPrice: 50000,
    };

    (useBooking as jest.Mock).mockReturnValue({
      ...mockUseBooking,
      booking: testBooking,
    });

    render(<CartIconWithModal />);
    fireEvent.click(screen.getByLabelText('Shopping Cart'));
    fireEvent.click(screen.getByText('Цэвэрлэх'));
    expect(mockClearBooking).toHaveBeenCalled();
  });
});
