import { RequestModel } from '../../../src/models/request.model';
import { createCancelRequest } from '../../../src/resolvers/mutations';
import { findTicketById } from '../../../src/utils/find-ticket-by-id';
import { findUserById } from '../../../src/utils/find-user-by-id';

jest.mock('../../../src/models/request.model');
jest.mock('../../../src/utils/find-ticket-by-id');
jest.mock('../../../src/utils/find-user-by-id');

describe('creating new cancel request', () => {
  it('should create a cancel request', async () => {
    (findTicketById as jest.Mock).mockResolvedValue({ id: 'ticket-id', user: 'user-id' });
    (findUserById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (RequestModel.findOne as jest.Mock).mockResolvedValue(null);
    (RequestModel.create as jest.Mock).mockResolvedValue({ id: 'request-id' });

    const result = await createCancelRequest({}, { userId: 'user-id', ticketId: 'ticketid' });

    expect(result).toEqual({ id: 'request-id' });
  });

  it('should throw an error bcz user is not the owner of the ticket', async () => {
    (findTicketById as jest.Mock).mockResolvedValue({ id: 'ticket-id', user: 'userid' });
    (findUserById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (RequestModel.findOne as jest.Mock).mockResolvedValue(null);
    (RequestModel.create as jest.Mock).mockResolvedValue({ id: 'request-id' });

    await expect(createCancelRequest({}, { userId: 'user-id', ticketId: 'ticketid' })).rejects.toThrow('Тасалбарын эзэн биш байна!');
  });

  it('should throw an error bcz request exists', async () => {
    (findTicketById as jest.Mock).mockResolvedValue({ id: 'ticket-id', user: 'userid' });
    (findUserById as jest.Mock).mockResolvedValue({ id: 'user-id' });
    (RequestModel.findOne as jest.Mock).mockResolvedValue({ id: 'request-id' });

    await expect(createCancelRequest({}, { userId: 'user-id', ticketId: 'ticketid' })).rejects.toThrow('Аль хэдий нь хүсэлт гаргасан байна!');
  });
});
