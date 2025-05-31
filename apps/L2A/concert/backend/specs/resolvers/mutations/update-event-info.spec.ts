import { concertModel } from '../../../src/models';
import { updateEventInfo } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');

describe('update an event', () => {
  it('should update an event info', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue({ id: 'mocked-id' });
    (concertModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ id: 'mocked-id' });

    const result = await updateEventInfo({}, { concertId: 'mockid' });
    expect(result).toEqual({ id: 'mocked-id' });
  });

  it('should throw an error', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(updateEventInfo({}, { concertId: 'mockid' })).rejects.toThrow('Концерт олдсонгүй!');
  });
});
