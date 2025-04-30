import { GraphQLResolveInfo } from 'graphql';
import { createTicket } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/ticket.model', () => ({
  ticketModel: {
    create: jest.fn().mockResolvedValue({
      concert: 'testing_concert',
      seatNumber: '120',
      price: 120,
      type: 'VIP',
      Status: 'AVAILABLE',
    }),
  },
}));

const context = {};
const info = {} as GraphQLResolveInfo;
const args = {
  concert: 'testing_concert',
  seatNumber: '120',
  price: 120,
  type: 'VIP',
  Status: 'AVAILABLE',
};

describe('check if ticket already created', () => {
  it('mutation - create-ticket', async () => {
    if (createTicket) {
      const response = await createTicket({}, args, context, info);
      expect(response.seatNumber).toBe(args.seatNumber);
    }
  });
});
