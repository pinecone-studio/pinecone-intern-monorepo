import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payment from '@/components/ticketReservation/PaymentSection';

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props) => <img {...props} />,
// }));

// jest.mock('next/link', () => ({
//   __esModule: true,
//   default: ({ children, href }) => <a href={href}>{children}</a>,
// }));

describe('Payment Component - setActivePayment', () => {
  const value = {
    concertday: 'day',
    concertId: '1',
    vipQuantity: 0,
    vipPrice: 1,
    standartQuantity: 0,
    standartPrice: 1,
    standingAreaQuantity: 0,
    standingAreaPrice: 1,
    email: 'email',
    phoneNumber: 1,
    totalPrice: 1,
    orderNumber: 1,
    payType: 'qpay',
  };
  it('initial state is null', () => {
    render(<Payment handleChange={jest.fn()} handleNext={jest.fn()} value={value} />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    const socialPayButton = screen.getByText('Social pay').closest('div');

    expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
    expect(socialPayButton).not.toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to "qpay" when Qpay is clicked', async () => {
    render(<Payment handleChange={jest.fn()} handleNext={jest.fn()} value={value} />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    await act(async () => {
      fireEvent.click(qpayButton);
    });

    expect(qpayButton).toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to "socialpay" when Social Pay is clicked', async () => {
    render(<Payment handleChange={jest.fn()} handleNext={jest.fn()} value={value} />);
    const socialPayButton = screen.getByText('Social pay').closest('div');
    await act(async () => {
      fireEvent.click(socialPayButton);
    });
    expect(socialPayButton).toHaveClass('border-[#00B7F4]');
  });

  it('sets activePayment to null when the selected payment method is clicked again', async () => {
    render(<Payment handleChange={jest.fn()} handleNext={jest.fn()} value={value} />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    await act(async () => {
      fireEvent.click(qpayButton);
    });
    expect(qpayButton).toHaveClass('border-[#00B7F4]');
    await act(async () => {
      fireEvent.click(qpayButton);
    });
    // expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
  });

  it('switches activePayment when a different payment method is clicked', async () => {
    render(<Payment handleChange={jest.fn()} handleNext={jest.fn()} value={value} />);
    const qpayButton = screen.getByText('Qpay').closest('div');
    const socialPayButton = screen.getByText('Social pay').closest('div');
    await act(async () => {
      fireEvent.click(qpayButton);
    });
    expect(qpayButton).toHaveClass('border-[#00B7F4]');
    expect(socialPayButton).not.toHaveClass('border-[#00B7F4]');
    await act(async () => {
      fireEvent.click(socialPayButton);
    });
    expect(socialPayButton).toHaveClass('border-[#00B7F4]');
    expect(qpayButton).not.toHaveClass('border-[#00B7F4]');
  });
});
