import { UpdateStatusType } from 'apps/L1AB/hotel-booking/backend/src/generated';
import { updateBooking } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        status: 'canceled',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update booking', () => {
  const mockInput = { _id: '1', status: UpdateStatusType.Canceled };
  it('should update a booking successfully', async () => {
    const result = await updateBooking!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      success: true,
      message: 'Successfully updated booking',
    });
  });

  it('should return error when there is a failure in updating the booking', async () => {
    const result = await updateBooking!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ success: false, message: 'Failed to update booking' });
  });
});
