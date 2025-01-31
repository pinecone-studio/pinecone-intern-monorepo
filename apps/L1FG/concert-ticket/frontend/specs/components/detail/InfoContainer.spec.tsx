import InfoContainer from '@/components/detail/InfoContainer';
import { GetConcertDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

describe('InfoContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Storage.prototype.getItem = jest.fn(() => JSON.stringify({ id: 'user-1' }));

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  const getConcertMock: MockedResponse = {
    request: {
      query: GetConcertDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
        getConcert: {
          __typename: 'Concert',
          _id: '1',
          concertName: 'Test Concert',
          artistName: ['Ella Harmony'],
          concertDay: '2025-05-05T00:00:00.000Z',
          concertPlan: 'Coldplay',
          concertTime: '18:00',
          concertPhoto: 'fsg',
          regularTicket: {
            __typename: 'Ticket',
            price: 60,
            quantity: 180,
          },
          standingAreaTicket: {
            __typename: 'Ticket',
            price: 40,
            quantity: 50,
          },
          vipTicket: {
            __typename: 'Ticket',
            price: 120,
            quantity: 40,
          },
        },
      },
    },
  };

  it('should render artist names', async () => {
    render(
      <MockedProvider mocks={[getConcertMock]}>
        <InfoContainer ticketID="1" />
      </MockedProvider>
    );

    const container = await screen.findByTestId('info-container-concert-name');
    const artistItems = within(container).getAllByTestId('artist-item');

    expect(artistItems).toHaveLength(1);
    expect(artistItems[0]).toHaveTextContent('Ella Harmony');
  });

  it('should handle ticket reservation for authenticated user', async () => {
    render(
      <MockedProvider mocks={[getConcertMock]}>
        <InfoContainer ticketID="1" />
      </MockedProvider>
    );

    const button = await screen.findByTestId('info-container-ticket-reservation');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/ticketReservation/1');
    });
  });

  it('should redirect to signin for unauthenticated user', async () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValue(null);

    render(
      <MockedProvider mocks={[getConcertMock]}>
        <InfoContainer ticketID="1" />
      </MockedProvider>
    );

    const button = await screen.findByTestId('info-container-ticket-reservation');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/signin');
    });
  });
});
