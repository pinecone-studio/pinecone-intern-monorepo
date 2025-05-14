import { GraphQLResolveInfo } from 'graphql/type/definition';
import { createVenue } from '../../../src/resolvers/mutations';
import { catchError } from '../../../src/utils/catch-error';
import * as venueModelModule from '../../../src/models';

jest.mock('../../../src/models', () => ({
  venueModel: {
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

  it('should handle non-Error thrown by venueModel.create with "Серверийн алдаа"', async () => {
    const nonError = 'Unexpected database issue';
    jest.spyOn(venueModelModule.venueModel, 'create').mockRejectedValueOnce(nonError);

    await expect(createVenue?.({}, args, context, info)).rejects.toThrow('Серверийн алдаа');
    expect(catchError).toHaveBeenCalledWith(nonError);
    expect(catchError).toHaveBeenCalledTimes(1);
  });
});
