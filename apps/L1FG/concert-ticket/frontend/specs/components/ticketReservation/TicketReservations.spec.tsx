import { useAlert } from '@/components/providers/AlertProvider';
import TicketReservations from '@/components/ticketReservation/TicketReservations';
import { GetConcertDocument, GetOrderTicketNumberDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

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

jest.mock('@/components/providers/AlertProvider', () => ({
  useAlert: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockGetConcert = {
  request: {
    query: GetConcertDocument,
    variables: {
      id: '678ddd76c9cdc57819820767',
    },
  },
  result: {
    data: {
      getConcert: {
        _id: '678ddd76c9cdc57819820767',
        concertName: 'Shape of You Tour',
        concertPlan: 'Standard',
        artistName: ['Ed Sheeran'],
        concertDay: '2025-01-25T00:00:00.000Z',
        concertTime: '19:30',
        concertPhoto: '/images/edsheeran.png',
        vipTicket: {
          price: 230000,
          quantity: 80,
        },
        regularTicket: {
          price: 120000,
          quantity: 154,
        },
        standingAreaTicket: {
          price: 60000,
          quantity: 282,
        },
      },
    },
  },
};

const mockGetOrderTicketNumber: MockedResponse = {
  request: { query: GetOrderTicketNumberDocument, variables: { ticketNumber: value.orderNumber } },
  error: new Error('An error occurred'),
};
const mockGetOrderTicketNumber2: MockedResponse = {
  request: { query: GetOrderTicketNumberDocument, variables: { ticketNumber: value.orderNumber } },
  result: {
    data: {
      getOrderTicketNumber: {
        userID: '67987351516d800fe08dff61',
        concertID: '6787a8946ba06ccedf494960',
        ticketID: '67ab2a9cf36e9f4710d1a820',
        phoneNumber: 645645,
        email: 'ghfsghsfg',
        totalPrice: 220000,
        paymentType: 'socialpay',
        ticketNumber: 1,
        vipTicket: {
          price: 0,
          quantity: 0,
        },
        regularTicket: {
          price: 220000,
          quantity: 2,
        },
        standingAreaTicket: {
          price: 0,
          quantity: 0,
        },
        _id: '67ab2aa4f36e9f4710d1a824',
      },
    },
  },
};
describe('ticket reservation', () => {
  const mockHandleChange = jest.fn();
  const mockHandleBack = jest.fn();
  const mockshowAlert = jest.fn();
  const mockRouter = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockRouter });
  (useAlert as jest.Mock).mockReturnValue({ showAlert: mockshowAlert });
  it('should ticket reservation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetConcert, mockGetOrderTicketNumber]} addTypename={false}>
        <TicketReservations text="" handleNext={jest.fn()} handleBack={mockHandleBack} handleChange={mockHandleChange} value={value} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('concert-detail-button'));
    });
  });
  it('should ticket reservation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetConcert, mockGetOrderTicketNumber2]} addTypename={false}>
        <TicketReservations text="" handleNext={jest.fn()} handleBack={mockHandleBack} handleChange={mockHandleChange} value={value} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('concert-detail-button'));
    });
  });
});
