import { ticketModel } from '../../../src/models';
import { userTickets } from '../../../src/resolvers/queries';

jest.mock('../../../src/models');

describe('user tickets', () => {
  it('should fetch user tickets', async () => {
    (ticketModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
      }),
    });
    const result = await userTickets({}, { userId: 'random-ideez' });

    expect(result).toEqual([{ id: 'mock-id' }]);
  });

  it('should throw an error', async () => {
    (ticketModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('random aldaa')),
      }),
    });

    await expect(userTickets({}, { userId: 'random-ideez' })).rejects.toThrow('random aldaa');
  });
});
