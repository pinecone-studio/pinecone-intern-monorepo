import { getHotelsByName } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries/hotel/get-hotels-by-name';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce([{ id: '1' }]),
  },
}));

describe('Ner ni oruulsan input iig aguuldag hotel uudiig butsaah', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should return null because not a single hotel was found', async () => {
    if (!getHotelsByName) {
      throw new Error('getHotelsByName is not defined');
    }

    const response = await getHotelsByName({}, { input: { name: 'ababba' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('Should return hotels', async () => {
    const mockHotels = [
      {
        id: '1',
      },
    ];

    if (!getHotelsByName) {
      throw new Error('getHotelsByName is not defined');
    }

    const response = await getHotelsByName({}, { input: { name: 'a' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotels);
  });
});
