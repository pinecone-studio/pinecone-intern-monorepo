import { GraphQLResolveInfo } from 'graphql';
import { getHotelsByStarRating } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';
import { HotelModel } from '../../../../src/models';

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
    (HotelModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ id: '1' }]),
    });

    const response = await getHotelsByStarRating!({}, { sortByRating: true }, {}, {} as GraphQLResolveInfo);
    expect(response);
  });

  it('Unknown error garah', async () => {
    (HotelModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });

    const response = await getHotelsByStarRating!({}, { sortByRating: false }, {}, {} as GraphQLResolveInfo);
    expect(response);
  });
});
