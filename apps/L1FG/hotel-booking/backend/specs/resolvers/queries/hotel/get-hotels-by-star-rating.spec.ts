import { GraphQLResolveInfo } from 'graphql';
import { getHotelsByStarRating } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    find: jest.fn(),
  },
}));

describe('Get hotels star rating ihees baga ruu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get hotels, work fine', async () => {
    (require('../../../../src/models').HotelModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValueOnce([{ id: '1' }]),
    });

    const mock = [{ id: '1' }];
    const response = await getHotelsByStarRating!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mock);
  });

  it('Unknown error garah', async () => {
    (require('../../../../src/models').HotelModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValueOnce(null),
    });

    const response = await getHotelsByStarRating!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
});
