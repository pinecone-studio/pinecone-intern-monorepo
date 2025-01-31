import '@testing-library/jest-dom';
import { Card } from '@/components/ticketCard/Card';
import { act, fireEvent, render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const card = {
  _id: 'jdwhfg37',
  concertName: 'Coldplay live',
  concertPlan: 'Coldplay',
  artistName: ['dfsvsdv'],
  concertDay: '2025-1-31',
  concertTime: 'fdg',
  concertPhoto: 'fsg',
  vipTicket: { price: 34, quantity: 234 },
  regularTicket: { price: 34, quantity: 234 },
  standingAreaTicket: { price: 34, quantity: 234 },
};

describe('Card component', () => {
  it('should render the correct concert date and handle click event', async () => {
    const { getByTestId } = render(<Card card={card} />);
    const dateText = getByTestId('card-format-date');
    const cardDetail = getByTestId('card-container');

    await act(async () => {
      fireEvent.click(cardDetail);
    });

    expect(dateText).toBeInTheDocument();
  });
});
