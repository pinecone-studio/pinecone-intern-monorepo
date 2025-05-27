import { concertModel } from '../../../src/models';
import { searchEvents } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/concert.model');
describe('searchEvent', () => {
  it('should search concerts by name', async () => {
    const mockConcerts = [
      { title: 'Concert A', date: new Date() },
      { title: 'Concert B', date: new Date() },
    ];
    (concertModel.find as jest.Mock).mockResolvedValue(mockConcerts);
    const mockName = 'Concert A';
    const result = await searchEvents(null, { name: mockName });
    expect(result).toEqual(expect.arrayContaining(mockConcerts));
  });

  it('should throw an error when name is not provided', async () => {
    await expect(searchEvents(null, { name: '' })).rejects.toThrow('Name parameter is required for searching events.');
  });
});
