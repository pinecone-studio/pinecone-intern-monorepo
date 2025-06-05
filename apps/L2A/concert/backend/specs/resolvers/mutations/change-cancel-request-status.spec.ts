import { RequestModel } from '../../../src/models/request.model';
import { changeStatus } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/request.model');

describe('change cancel request status', () => {
  it('should successfully change status', async () => {
    (RequestModel.findById as jest.Mock).mockResolvedValue({ id: 'mock-id' });
    (RequestModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ id: 'mock-id' });

    const result = await changeStatus({}, { requestId: 'ideez' });
    expect(result).toEqual({ id: 'mock-id' });
  });

  it('should successfully change status', async () => {
    (RequestModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(changeStatus({}, { requestId: 'ideez' })).rejects.toThrow('Хүсэлт олдсонгүй!');
  });
});
