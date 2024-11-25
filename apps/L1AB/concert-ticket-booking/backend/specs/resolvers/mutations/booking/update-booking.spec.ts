import { updateBookingEverything } from '../../../../src/resolvers/mutations/booking/update-booking-eveything';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        status: 'Updated',
        phone: '1234567890',
        email: 'tur5455@gmail.com',
        amountTotal: 500,
        bankAccount: 11,
        selectedDate: '2024-12-01',
        venues: [],
      })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));
describe('Update booking Mutation', () => {
  it('Should update booking', async () => {
    const result = await updateBookingEverything(
      {},
      {
        input: {
          _id: '1',
          status: 'Updated',
          phone: '1234567890',
          email: 'tur5455@gmail.com',
          amountTotal: 500,
          bankAccount: 11,
          selectedDate: '2024-12-01',
          venues: [],
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      status: 'Updated',
      phone: '1234567890',
      email: 'tur5455@gmail.com',
      amountTotal: 500,
      bankAccount: 11,
      selectedDate: '2024-12-01',
      venues: [],
    });
  });

  it('Should throw an error if the event is not found', async () => {
    try {
      await updateBookingEverything(
        {},
        {
          input: {
            _id: '1',
            status: 'Updated',
            phone: '1234567890',
            email: 'tur5455@gmail.com',
            amountTotal: 500,
            bankAccount: 11,
            selectedDate: '2024-12-01',
            venues: [],
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update Booking');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });

  it('Should throw an error if there is a database error', async () => {
    try {
      await updateBookingEverything(
        {},
        {
          input: {
            _id: '1',
            status: 'Updated',
            phone: '1234567890',
            email: 'tur5455@gmail.com',
            amountTotal: 500,
            bankAccount: 11,
            selectedDate: '2024-12-01',
            venues: [],
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update Booking');
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });
});
