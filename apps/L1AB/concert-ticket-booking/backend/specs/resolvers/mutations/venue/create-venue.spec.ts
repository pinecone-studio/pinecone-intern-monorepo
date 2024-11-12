import { GraphQLResolveInfo } from 'graphql';
import { createVenue } from '../../../../src/resolvers/mutations/venue/create-venue';

jest.mock('../../../../src/models', () => ({
  VenueModel: {
    create: jest.fn().mockResolvedValue({
      _id: 'venue_id',
      name: [{ nameType: 'Main Hall', quantity: 1, price: 100 }],
      additional: ['Extra Seating'],
    }),
  },
}));

describe('createVenue', () => {
  it('should create a venue', async () => {
    const venueData = {
      name: [{ nameType: 'Main Hall', quantity: 1, price: 100 }],
      additional: ['Extra Seating'],
    };
    const response = await createVenue!({}, venueData, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      _id: 'venue_id',
      name: [{ nameType: 'Main Hall', quantity: 1, price: 100 }],
      additional: ['Extra Seating'],
    });
  });
});
