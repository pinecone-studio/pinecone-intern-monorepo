import { GraphQLResolveInfo } from 'graphql';
import { createBooking } from '../../../src/resolvers/mutations/create-booking';
import { catchError } from '../../../src/utils/catch-error';
import * as validateUserModule from '../../../src/utils/create-booking/validate-user';
import * as bookingsModelModule from '../../../src/models/booking.model';

jest.mock('../../../src/utils/create-booking/validate-user', () => ({
  validateUser: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../../src/utils/create-booking/validate-concert', () => ({
  validateConcert: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../../src/utils/create-booking/validate-tickets', () => ({
  validateTickets: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../../src/models/booking.model', () => ({
  bookingsModel: {
    create: jest.fn().mockResolvedValue({
      id: 'booking_test_id',
      user: 'testing_user',
      concert: 'concert_test',
      tickets: ['ticket_test'],
      totalAmount: 169,
      status: 'PENDING',
    }),
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({
        id: 'booking_test_id',
        user: { id: 'testing_user' },
        concert: { id: 'concert_test' },
        tickets: [{ id: 'ticket_test' }],
        totalAmount: 169,
        status: 'PENDING',
      }),
    }),
  },
}));

jest.mock('../../../src/utils/catch-error', () => ({
  catchError: jest.fn((error) => {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Серверийн алдаа');
  }),
}));

const context = {};
const info = {} as GraphQLResolveInfo;

const args = {
  input: {
    userId: 'sdfsad',
    concertId: 'concert_test',
  },
  ticketIds: ['ticket_test'],
};

describe('createBooking Mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a booking successfully', async () => {
    const response = await createBooking?.({}, args, context, info);
    expect(response?.concert.id).toBe(args.input.concertId);
    expect(response?.id).toBe('booking_test_id');
    expect(catchError).not.toHaveBeenCalled();
  });

  it('should handle Error instance by rethrowing with same message', async () => {
    const error = new Error('User validation failed');
    jest.spyOn(validateUserModule, 'validateUser').mockRejectedValueOnce(error);

    await expect(createBooking?.({}, args, context, info)).rejects.toThrow('User validation failed');
    expect(catchError).toHaveBeenCalledWith(error);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error value by throwing "Серверийн алдаа"', async () => {
    const nonError = 'Some unexpected error';
    jest.spyOn(validateUserModule, 'validateUser').mockRejectedValueOnce(nonError);

    await expect(createBooking?.({}, args, context, info)).rejects.toThrow('Серверийн алдаа');
    expect(catchError).toHaveBeenCalledWith(nonError);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle Error in bookingsModel.create with same message', async () => {
    const error = new Error('Booking creation failed');
    jest.spyOn(bookingsModelModule.bookingsModel, 'create').mockRejectedValueOnce(error);

    await expect(createBooking?.({}, args, context, info)).rejects.toThrow('Booking creation failed');
    expect(catchError).toHaveBeenCalledWith(error);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error in bookingsModel.create with "Серверийн алдаа"', async () => {
    const nonError = { message: 'Unexpected error object' };
    jest.spyOn(bookingsModelModule.bookingsModel, 'create').mockRejectedValueOnce(nonError);

    await expect(createBooking?.({}, args, context, info)).rejects.toThrow('Серверийн алдаа');
    expect(catchError).toHaveBeenCalledWith(nonError);
    expect(catchError).toHaveBeenCalledTimes(1);
  });
});
