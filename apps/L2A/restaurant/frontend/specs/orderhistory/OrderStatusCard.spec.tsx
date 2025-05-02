import { OrderStatusCard } from '@/app/user/orderhistory/_components/OrderStatusCard';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('OrderStatusCard', () => {
  const baseProps = {
    orderId: '12345',
    timestamp: '2025-04-30 12:00',
    totalPrice: 15000,
  };

  it('renders correctly with status "done"', () => {
    render(<OrderStatusCard {...baseProps} status="done" />);
    expect(screen.getByText('#12345')).toBeInTheDocument();
    expect(screen.getByText('Дууссан')).toBeInTheDocument();
    expect(screen.getByText('2025-04-30 12:00')).toBeInTheDocument();
    expect(screen.getByText('15,000₮')).toBeInTheDocument();
  });

  it('renders correctly with status "preparing"', () => {
    render(<OrderStatusCard {...baseProps} status="preparing" />);
    expect(screen.getByText('Бэлтгэгдэж буй')).toBeInTheDocument();
  });
});
