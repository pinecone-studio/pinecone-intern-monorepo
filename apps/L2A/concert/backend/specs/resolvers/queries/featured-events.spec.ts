import { concertModel } from '../../../src/models';
import { featuredEvents } from '../../../src/resolvers/queries';

jest.mock('../../../src/models');

describe('featured events', () => {
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
  it('should fetch featured events', async () => {
    (concertModel.find as jest.Mock).mockReturnValue({ populate: jest.fn().mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockConcerts) }) }) });

    const result = await featuredEvents();

    expect(result).toEqual(mockConcerts);
  });

  it('should thrown an err', async () => {
    (concertModel.find as jest.Mock).mockReturnValue({ populate: jest.fn().mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('deez')) }) }) });

    await expect(featuredEvents()).rejects.toThrow('deez');
  });
});
