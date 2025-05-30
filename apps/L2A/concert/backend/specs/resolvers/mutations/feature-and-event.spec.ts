import { concertModel } from '../../../src/models';
import { featureAnEvent } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');
describe('feature an event', () => {
  it('should feature an event', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue({ id: 'mocked-concert-id', featured: false });
    (concertModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ id: 'mocked-concert-id', featured: true });

    const result = await featureAnEvent({}, { concertId: 'just-an-id' });
    expect(result).toEqual({ id: 'mocked-concert-id', featured: true });
  });

  it('should throw an error', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(featureAnEvent({}, { concertId: 'just-an-id' })).rejects.toThrow('Концерт олдсонгүй!');
  });
});
