import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessMessage from '@/components/success/Success';

describe('SuccessMessage Component', () => {
  it('renders with the default message', () => {
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
    render(<SuccessMessage handleBack={jest.fn()} handleChange={jest.fn()} text="" ticketID="678ddd76c9cdc57819820767" handleNext={jest.fn()} value={value} />);
    // const messageElement = screen.getByText('Амжилттай үүсгэлээ.');
    // expect(messageElement).toBeInTheDocument();
    // expect(messageElement).toHaveClass('text-white');
  });

  // test('renders with a custom message', () => {
  //   const customMessage = 'Custom success message!';
  //   render(<SuccessMessage message={customMessage} />);
  //   const messageElement = screen.getByText(customMessage);
  //   expect(messageElement).toBeInTheDocument();
  // });
});
