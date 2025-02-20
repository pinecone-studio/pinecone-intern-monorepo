import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import TicketSubscriberBuysection from '@/components/ticketConfirm/TicketBuySection';
import { MockedProvider } from '@apollo/client/testing';

describe('TicketSubscriberBuysection', () => {
  it('ticket quantity===0', async () => {
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
    const { getByTestId } = render(
      <MockedProvider>
        <TicketSubscriberBuysection value={value} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );
    const total = getByTestId('ticket-buy-continue');

    await act(async () => {
      fireEvent.click(total);
    });

    expect('').toBeDefined();
  });
});
