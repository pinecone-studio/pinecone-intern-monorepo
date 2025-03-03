import { GraphQLResolveInfo } from 'graphql';
import { getHotelsByName } from '../../../../src/resolvers/queries';

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
    const response = await getHotelsByName!({}, { input: { name: 'ababba' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('Should return hotels', async () => {
    const mockHotels = [
      {
        id: '1',
      },
    ];
    const response = await getHotelsByName!({}, { input: { name: 'a' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotels);
  });
});
