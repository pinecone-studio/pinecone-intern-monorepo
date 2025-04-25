import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderHistory from '@/app/userProfile/[id]/components/OrderHistory';
import '@testing-library/jest-dom';

const mockProps = {
  orderId: '123456',
  date: '2025-04-25',
  status: 'Амжилттай',
  tickets: [
    { name: 'VIP тасалбар', price: 20000, quantity: 2, color: 'text-blue-500' },
    { name: 'Ердийн тасалбар', price: 10000, quantity: 1, color: 'text-red-500' },
  ],
};

describe('OrderHistory component', () => {
  it('renders order details correctly', () => {
    render(<OrderHistory {...mockProps} />);

    expect(screen.getByText(/Захиалгын дугаар:/i)).toBeInTheDocument();
    expect(screen.getByText(`#${mockProps.orderId}`)).toBeInTheDocument();
    expect(screen.getByText(/2025-04-25/)).toBeInTheDocument();
    expect(screen.getByText(/Амжилттай/)).toBeInTheDocument();
  });

  it('renders ticket items and totals', () => {
    render(<OrderHistory {...mockProps} />);

    expect(screen.getByText(/VIP тасалбар/)).toBeInTheDocument();
    expect(screen.getByText(/Ердийн тасалбар/)).toBeInTheDocument();
    expect(screen.getByText(/20,000₮ × 2 = 40,000₮/)).toBeInTheDocument();
    expect(screen.getByText(/10,000₮ × 1 = 10,000₮/)).toBeInTheDocument();
    expect(screen.getByText(/Төлсөн дүн: 50,000₮/)).toBeInTheDocument();
  });

  it('shows cancel button when status is not provided', () => {
    const propsWithoutStatus = { ...mockProps, status: undefined };
    render(<OrderHistory {...propsWithoutStatus} />);

    expect(screen.getByRole('button', { name: /Цуцлах/i })).toBeInTheDocument();
  });
});
