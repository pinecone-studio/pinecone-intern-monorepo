import { editBookingStatus } from 'apps/L1FG/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce({ id: '1', status: 'cancelled' }).mockResolvedValueOnce(null),
  },
}));

describe('editBookingStatus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the edited booking's status", async () => {
    const mockInput = { id: '1', status: 'cancelled' };
    const response = await editBookingStatus!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual({ id: '1', status: 'cancelled' });
  });
  it('should return an empty array if the booking is not found', async () => {
    const mockInout = { id: '', status: '' };
    const response = await editBookingStatus!({}, { input: mockInout }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
});
