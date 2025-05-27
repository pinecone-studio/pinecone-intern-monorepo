import { concertModel } from '../../../src/models';
import { searchEvents } from '../../../src/resolvers/mutations';

const mockConcerts = [
  { title: 'Concert A', date: new Date() },
  { title: 'Concert B', date: new Date() },
];
jest.mock('../../../src/models/concert.model');

const populateMock = jest.fn().mockReturnValue(mockConcerts);

(concertModel.find as jest.Mock).mockReturnValue({
  populate: jest.fn().mockReturnValue({
    populate: populateMock,
  }),
});
describe('searchEvent', () => {
  it('should search concerts by name', async () => {
    const mockName = 'Concert A';
    const result = await searchEvents(null, { name: mockName });
    expect(result).toEqual(expect.arrayContaining(mockConcerts));
  });

  it('should throw an error when name is not provided', async () => {
    await expect(searchEvents(null, { name: '' })).rejects.toThrow('Name parameter is required for searching events.');
  });
});
