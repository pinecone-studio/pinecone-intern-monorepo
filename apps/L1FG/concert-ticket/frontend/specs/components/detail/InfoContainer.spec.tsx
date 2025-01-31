import InfoContainer from '@/components/detail/InfoContainer';
import { GetConcertDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';

const getConcertMock: MockedResponse = {
  request: {
    query: GetConcertDocument,
    variables: {
      id: '1',
    },
  },
  result: {
    data: {
      getConcert: {
        _id: '1',
        artistName: ['Ella Harmony'],
        concertDay: '2025-05-05T00:00:00.000Z',
        concertPlan: 'Coldplay',
        concertTime: '18:00',
        concertName: 'kjnkj',
        concertPhoto: 'fsg',
        regularTicket: { price: 60, quantity: 180 },
        standingAreaTicket: { price: 40, quantity: 50 },
        vipTicket: { price: 120, quantity: 40 },
      },
    },
  },
};
describe('InfoContainer', () => {
  it('should render artist names', async () => {
    render(
      <MockedProvider mocks={[getConcertMock]}>
        <InfoContainer ticketID="1" />
      </MockedProvider>
    );
    const container = await screen.findByTestId('info-container-concert-name');

    await waitFor(() => {
      const artistItems = within(container).getAllByTestId('artist-item');
      expect(artistItems).toHaveLength(1);
      expect(artistItems[0]).toHaveTextContent('Ella Harmony');
    });
  });
});
