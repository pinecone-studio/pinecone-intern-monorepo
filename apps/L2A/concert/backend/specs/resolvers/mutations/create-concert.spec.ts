import { GraphQLResolveInfo } from 'graphql';
import { createConcert } from '../../../src/resolvers/mutations';
import { catchError } from '../../../src/utils/catch-error';
import { TicketType } from '../../../src/generated';
import * as venueModelModule from '../../../src/models/venue.model';
import * as concertModelModule from '../../../src/models/concert.model';

jest.mock('../../../src/models/concert.model', () => ({
  concertModel: {
    create: jest.fn().mockResolvedValue({
      title: 'testing_title',
      description: 'testing_descs',
      venue: 'testing_venue_id',
      artistName: 'testing_artist_name',
      specialGuestName: 'testting_guest_name',
      ticketCategories: [
        {
          type: 'BACKSEAT',
          price: 500,
          capacity: 100,
        },
      ],
    }),
  },
}));

jest.mock('../../../src/models/venue.model', () => ({
  venueModel: {
    findById: jest.fn().mockResolvedValue({ id: 'testing_venue_id' }),
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
  title: 'testing_title',
  description: 'testing_descs',
  venueId: 'testing_venue_id',
  artistName: 'testing_artist_name',
  specialGuestName: 'testting_guest_name',
  ticketCategories: [
    {
      capacity: 100,
      price: 500,
      type: TicketType.Backseat,
    },
  ],
};

describe('createConcert mutation tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a concert', async () => {
    const response = await createConcert?.({}, args, context, info);

    expect(response?.artistName).toBe(args.artistName);
    expect(response?.title).toBe(args.title);
    expect(response?.ticketCategories[0].type).toBe(args.ticketCategories[0].type);
    expect(catchError).not.toHaveBeenCalled();
  });

  it('should throw "Venue not found" and call catchError when venue is not found', async () => {
    jest.spyOn(venueModelModule.venueModel, 'findById').mockResolvedValueOnce(null);

    await expect(createConcert?.({}, args, context, info)).rejects.toThrow('Venue not found');
    expect(catchError).toHaveBeenCalledWith(expect.any(Error));
    expect(catchError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Venue not found' }));
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error thrown by concertModel.create with "Серверийн алдаа"', async () => {
    const nonError = 'Unexpected database error';
    jest.spyOn(concertModelModule.concertModel, 'create').mockRejectedValueOnce(nonError);

    await expect(createConcert?.({}, args, context, info)).rejects.toThrow('Серверийн алдаа');
    expect(catchError).toHaveBeenCalledWith(nonError);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle Error thrown by concertModel.create with same message', async () => {
    const error = new Error('Concert creation failed');
    jest.spyOn(concertModelModule.concertModel, 'create').mockRejectedValueOnce(error);

    await expect(createConcert?.({}, args, context, info)).rejects.toThrow('Concert creation failed');
    expect(catchError).toHaveBeenCalledWith(error);
    expect(catchError).toHaveBeenCalledTimes(1);
  });
});
