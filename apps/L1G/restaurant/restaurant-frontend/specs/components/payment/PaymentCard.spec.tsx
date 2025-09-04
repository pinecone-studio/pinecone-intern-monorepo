/* eslint-disable */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentCard from '@/components/payment/PaymentCard';

// --- Mocks ---
jest.mock('next/image', () => {
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const { src, alt, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, ...pass } = rest;
    return React.createElement('img', { src, alt, ...pass });
  };
});

// shadcn/ui Card mock
jest.mock('@/components/ui/card', () => {
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Card = ({ children, className, onClick }: any) => React.createElement('div', { 'data-testid': 'card', role: 'button', className, onClick }, children);
  Card.displayName = 'MockCard';
  return { Card } as typeof import('@/components/ui/card');
});

describe('PaymentCard', () => {
  const method = { id: 'qpay', icon: '/qpay.png', name: 'Qpay' };

  it('нэрийг болон icon img-ийг рэндэрлэнэ', () => {
    render(<PaymentCard selectedPayment="" method={method} handlePaymentSelect={() => {}} />);
    expect(screen.getByText('Qpay')).toBeInTheDocument();
    const img = screen.getByRole('img', { name: 'icon' });
    expect(img).toBeInTheDocument();
  });

  it('дархад handlePaymentSelect(method.id) дуудна', () => {
    const onSelect = jest.fn();
    render(<PaymentCard selectedPayment="" method={method} handlePaymentSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('card'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('qpay');
  });

  it('сонгогдсон үед active стилийг, сонгогдоогүй үед hover стилийг хэрэглэнэ', () => {
    const { rerender } = render(<PaymentCard selectedPayment="" method={method} handlePaymentSelect={() => {}} />);
    const card = screen.getByTestId('card');

    expect(card).toHaveClass('hover:bg-gray-50');
    expect(card).not.toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');

    rerender(<PaymentCard selectedPayment="qpay" method={method} handlePaymentSelect={() => {}} />);
    expect(card).toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
    expect(card).not.toHaveClass('hover:bg-gray-50');
  });
});
