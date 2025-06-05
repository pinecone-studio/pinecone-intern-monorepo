import { ticketModel } from '../../../src/models/ticket.model';
import { concertModel } from '../../../src/models/concert.model';
import { RequestModel } from '../../../src/models/request.model';
import { deleteEvent } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/concert.model.ts');
jest.mock('../../../src/models/request.model.ts');
jest.mock('../../../src/models/ticket.model.ts');

describe('delete an event', () => {
  it('should delete an event', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue({ id: 'mocked-id' });
    (concertModel.findByIdAndDelete as jest.Mock).mockResolvedValue({ id: 'mocked-id' });
    (ticketModel.deleteMany as jest.Mock).mockResolvedValue([{ id: 'mockidssssssss' }]);
    (RequestModel.deleteMany as jest.Mock).mockResolvedValue([{ id: 'mockidssssssss' }]);

    const result = await deleteEvent({}, { id: 'mocked-id' });
    expect(result).toEqual({ id: 'mocked-id' });
  });

  it('should throw an error when no concert is found', async () => {
    (concertModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteEvent({}, { id: 'mocked-id' })).rejects.toThrow('Концерт олдсонгүй!');
  });
});
