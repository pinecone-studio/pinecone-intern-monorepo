import { concertModel } from '../../../src/models/concert.model';
import { concerts } from '../../../src/resolvers/queries';

jest.mock('../../../src/models/concert.model');

describe('concert Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a concert with populated venue', async () => {
    const mockConcerts = [
      {
        _id: 'concert123',
        title: 'Test Concert',
        venue: {
          _id: 'venue123',
          name: 'Test Venue',
        },
      },
    ];
    const populateMock = jest.fn().mockReturnValue(mockConcerts);

    (concertModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: populateMock,
      }),
    });

    const result = await concerts();

    expect(result).toEqual(mockConcerts);
  });

  it('should throw an error when no concert is found', async () => {
    const populateMock = jest.fn().mockReturnValue(null);

    (concertModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: populateMock,
      }),
    });

    await expect(concerts()).rejects.toThrow('Concert not found');
  });
});
