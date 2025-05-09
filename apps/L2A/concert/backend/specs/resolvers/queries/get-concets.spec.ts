import { concertModel } from '../../../src/models/concert.model';
import { concerts } from '../../../src/resolvers/queries';

jest.mock('../../../src/models/concert.model');

describe('concert Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a concert with populated venue', async () => {
    const mockConcert = [
      {
        _id: 'concert123',
        title: 'Test Concert',
        venue: {
          _id: 'venue123',
          name: 'Test Venue',
        },
      },
    ];
    (concertModel.find as jest.Mock).mockReturnValue(mockConcert);

    const result = await concerts();

    expect(result).toEqual(mockConcert);
  });

  it('should throw an error when no concert is found', async () => {
    (concertModel.find as jest.Mock).mockReturnValue(null);

    await expect(concerts()).rejects.toThrow('Concert not found');
  });
});
