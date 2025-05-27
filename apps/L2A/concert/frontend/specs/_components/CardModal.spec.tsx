import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartModal } from '@/app/_components/CardModal';

describe('CartModal', () => {
  const mockOnClose = jest.fn();
  const mockOnClear = jest.fn();

  const mockBooking = {
    concertName: 'Test Concert',
    date: '2023-12-31',
    tickets: [
      { type: 'VIP', count: 2, price: 50000 },
      { type: 'Standard', count: 1, price: 30000 },
    ],
    totalPrice: 130000,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(<CartModal isOpen={false} onClose={mockOnClose} booking={null} onClear={mockOnClear} />);
    expect(screen.queryByText('Миний тасалбарууд')).not.toBeInTheDocument();
  });

  it('should render with empty state when booking is null', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={null} onClear={mockOnClose} />);

    expect(screen.getByText('Миний тасалбарууд')).toBeInTheDocument();
    expect(screen.getByText('Тасалбар байхгүй байна')).toBeInTheDocument();
    expect(screen.getByText('Тоглолт харах')).toBeInTheDocument();
  });

  it('should render with booking data when provided', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />);

    expect(screen.getByText('Миний тасалбарууд')).toBeInTheDocument();
    expect(screen.getByText('Test Concert')).toBeInTheDocument();
    expect(screen.getByText('2023-12-31')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('2 × 50,000₮')).toBeInTheDocument();
    expect(screen.getByText('100,000₮')).toBeInTheDocument();
    expect(screen.getByText('1 × 30,000₮')).toBeInTheDocument();
    expect(screen.getByText('30,000₮')).toBeInTheDocument();
    expect(screen.getByText('Нийт дүн:')).toBeInTheDocument();
    expect(screen.getByText('130,000₮')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />);

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when "Хаах" button is clicked', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />);

    fireEvent.click(screen.getByText('Хаах'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClear when "Цэвэрлэх" button is clicked', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />);

    fireEvent.click(screen.getByText('Цэвэрлэх'));
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when "Тоглолт харах" button is clicked in empty state', () => {
    render(<CartModal isOpen={true} onClose={mockOnClose} booking={null} onClear={mockOnClear} />);

    fireEvent.click(screen.getByText('Тоглолт харах'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should display correct currency formatting', () => {
    const bookingWithLargeNumbers = {
      concertName: 'Big Concert',
      date: '2023-12-31',
      tickets: [{ type: 'Platinum', count: 3, price: 150000 }],
      totalPrice: 450000,
    };

    render(<CartModal isOpen={true} onClose={mockOnClose} booking={bookingWithLargeNumbers} onClear={mockOnClear} />);

    expect(screen.getByText('3 × 150,000₮')).toBeInTheDocument();

    const ticketTotals = screen.getAllByText('450,000₮');
    expect(ticketTotals.length).toBe(2);

    const grandTotal = screen.getByTestId('grand-total');
    expect(grandTotal).toHaveTextContent('450,000₮');
  });
});
