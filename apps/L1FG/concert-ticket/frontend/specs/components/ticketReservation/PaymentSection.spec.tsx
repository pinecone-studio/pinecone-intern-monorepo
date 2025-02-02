import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payment from '@/components/ticketReservation/PaymentSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

describe('Payment Component - setActivePayment', () => {
  it('initial state is null', () => {
    render(<Payment />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    const socialPayButton = screen.getByText('Social pay').closest('div');

    expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
    expect(socialPayButton).not.toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to "qpay" when Qpay is clicked', () => {
    render(<Payment />);
    const qpayButton = screen.getByText('Qpay').closest('div');

    fireEvent.click(qpayButton);
    expect(qpayButton).toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to "socialpay" when Social Pay is clicked', () => {
    render(<Payment />);
    const socialPayButton = screen.getByText('Social pay').closest('div');

    fireEvent.click(socialPayButton);
    expect(socialPayButton).toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to null when the selected payment method is clicked again', () => {
    render(<Payment />);
    const qpayButton = screen.getByText('Qpay').closest('div');

    fireEvent.click(qpayButton);
    expect(qpayButton).toHaveClass('border-[#00B7F4]');

    fireEvent.click(qpayButton);
    expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
  });

  it('switches activePayment when a different payment method is clicked', () => {
    render(<Payment />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    const socialPayButton = screen.getByText('Social pay').closest('div');

    fireEvent.click(qpayButton);
    expect(qpayButton).toHaveClass('border-[#00B7F4]');
    expect(socialPayButton).not.toHaveClass('border-[#00B7F4]');

    fireEvent.click(socialPayButton);
    expect(socialPayButton).toHaveClass('border-[#00B7F4]');
    expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
  });
});
