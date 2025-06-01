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
        seatData: {
          _id: 'seat123',
          totalSeats: 100,
        },
      },
    ];

    const sortMock = jest.fn().mockResolvedValue(mockConcerts);
    const populateSecondMock = jest.fn().mockReturnValue({ sort: sortMock });
    const populateFirstMock = jest.fn().mockReturnValue({ populate: populateSecondMock });

    (concertModel.find as jest.Mock).mockReturnValue({
      populate: populateFirstMock,
    });

    const result = await concerts();

    expect(result).toEqual(mockConcerts);
  });

  it('should throw an error when no concert is found', async () => {
    const sortMock = jest.fn().mockResolvedValue(null);
    const populateSecondMock = jest.fn().mockReturnValue({ sort: sortMock });
    const populateFirstMock = jest.fn().mockReturnValue({ populate: populateSecondMock });

    (concertModel.find as jest.Mock).mockReturnValue({
      populate: populateFirstMock,
    });

    await expect(concerts()).rejects.toThrow('Concert not found');
  });
});
