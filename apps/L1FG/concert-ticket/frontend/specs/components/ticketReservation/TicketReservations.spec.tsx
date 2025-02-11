import TicketReservations from '@/components/ticketReservation/TicketReservations';
import { GetConcertDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';

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
const mockHandleChange = jest.fn();
const mockHandleBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockGetConcert = {
  request: {
    query: GetConcertDocument,
    variables: {
      id: '1',
    },
  },
  result: {
    data: {
      getConcert: {
        _id: '678ddd76c9cdc57819820769',
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
describe('ticket reservation', () => {
  it('should ticket reservation', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mockGetConcert]}>
        <TicketReservations text="" handleNext={jest.fn()} handleBack={mockHandleBack} handleChange={mockHandleChange} value={value} ticketID="678ddd76c9cdc57819820767" />
      </MockedProvider>
    );
    await act(() => {
      fireEvent.click(getByTestId('concert-detail-button'));
    });
  });
});
