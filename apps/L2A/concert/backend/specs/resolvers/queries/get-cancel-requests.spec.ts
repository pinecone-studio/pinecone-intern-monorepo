import { RequestModel } from '../../../src/models/request.model';
import { getCancelRequests } from '../../../src/resolvers/queries';

jest.mock('../../../src/models/request.model');

describe('get cancel requests', () => {
  it('should get cancel requests', async () => {
    const execMock = jest.fn().mockResolvedValue([{ id: 'request-1' }]);

    const populateMock = jest.fn().mockReturnThis();
    const findMock = {
      populate: populateMock,
      exec: execMock,
    };

    (RequestModel.find as jest.Mock).mockReturnValue(findMock);

    const result = await getCancelRequests();

    expect(result).toEqual([{ id: 'request-1' }]);
  });

  it('should throw an error', async () => {
    const execMock = jest.fn().mockRejectedValue(new Error('deez nuts'));

    const populateMock = jest.fn().mockReturnThis();
    const findMock = {
      populate: populateMock,
      exec: execMock,
    };

    (RequestModel.find as jest.Mock).mockReturnValue(findMock);

    await expect(getCancelRequests()).rejects.toThrow('deez nuts');
  });
});
