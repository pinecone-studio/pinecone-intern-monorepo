import { GraphQLResolveInfo } from 'graphql/type/definition';
import { createVenue } from '../../../src/resolvers/mutations';
import { catchError } from '../../../src/utils/catch-error';
import * as venueModelModule from '../../../src/models';

jest.mock('../../../src/models', () => ({
  venueModel: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      name: 'testing_name',
      address: 'testing_address',
      city: 'testing_cities',
      capacity: 100,
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
  name: 'testing_name',
  address: 'testing_address',
  city: 'testing_cities',
  capacity: 100,
};

describe('createVenue mutation tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a venue', async () => {
    const response = await createVenue?.({}, args, context, info);
    expect(response).toBeDefined();
    expect(response?.name).toBe(args.name);
    expect(response?.address).toBe(args.address);
    expect(response?.city).toBe(args.city);
    expect(response?.capacity).toBe(args.capacity);
    expect(catchError).not.toHaveBeenCalled();
  });

  it('should throw "Venue already exists" and call catchError when venue exists', async () => {
    jest.spyOn(venueModelModule.venueModel, 'findOne').mockResolvedValueOnce({
      name: 'testing_name',
      address: 'existing_address',
      city: 'existing_city',
      capacity: 200,
    });

    await expect(createVenue?.({}, args, context, info)).rejects.toThrow('Venue already exists');
    expect(catchError).toHaveBeenCalledWith(expect.any(Error));
    expect(catchError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Venue already exists' }));
    expect(catchError).toHaveBeenCalledTimes(1);
    expect(venueModelModule.venueModel.findOne).toHaveBeenCalledWith({ name: 'testing_name' });
  });

  it('should handle Error thrown by venueModel.create with same message', async () => {
    const error = new Error('Database error');
    jest.spyOn(venueModelModule.venueModel, 'create').mockRejectedValueOnce(error);

    await expect(createVenue?.({}, args, context, info)).rejects.toThrow('Database error');
    expect(catchError).toHaveBeenCalledWith(error);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error thrown by venueModel.create with "Серверийн алдаа"', async () => {
    const nonError = 'Unexpected database issue';
    jest.spyOn(venueModelModule.venueModel, 'create').mockRejectedValueOnce(nonError);

    await expect(createVenue?.({}, args, context, info)).rejects.toThrow('Серверийн алдаа');
    expect(catchError).toHaveBeenCalledWith(nonError);
    expect(catchError).toHaveBeenCalledTimes(1);
  });

  it('should handle Error thrown by venueModel.findOne with same message', async () => {
    const error = new Error('Database query failed');
    jest.spyOn(venueModelModule.venueModel, 'findOne').mockRejectedValueOnce(error);

    await expect(createVenue?.({}, args, context, info)).rejects.toThrow('Database query failed');
    expect(catchError).toHaveBeenCalledWith(error);
    expect(catchError).toHaveBeenCalledTimes(1);
  });
});
