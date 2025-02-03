import { GraphQLResolveInfo } from 'graphql';
import { getHotelsByPrice } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    aggregate: jest
      .fn()
      .mockResolvedValueOnce([{ id: '1' }])
      .mockResolvedValueOnce(null),
  },
}));

describe('filter average room price', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('get hotels ascending or descending', async () => {
    const mockHotels = [{ id: '1' }];
    const response = await getHotelsByPrice!({}, { input: { type: 'asc' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotels);
  });

  it('should return hooson cause they were not found', async () => {
    const response = await getHotelsByPrice!({}, { input: { type: 'haha' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(null);
  });
});
