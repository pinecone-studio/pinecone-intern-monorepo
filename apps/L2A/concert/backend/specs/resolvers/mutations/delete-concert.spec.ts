import { concertModel } from '../../../src/models';
import { deleteEvent } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');

describe('delete an event', () => {
  it('should delete an event', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue({ id: 'mocked-id' });
    (concertModel.findByIdAndDelete as jest.Mock).mockResolvedValue({ id: 'mocked-id' });
    const result = await deleteEvent({}, { id: 'mocked-id' });
    expect(result).toEqual({ id: 'mocked-id' });
  });

  it('should throw an error when no concert is found', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteEvent({}, { id: 'mocked-id' })).rejects.toThrow('Концерт олдсонгүй!');
  });
});
