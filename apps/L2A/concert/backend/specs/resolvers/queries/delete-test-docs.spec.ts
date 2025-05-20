import { userModel } from '../../../src/models';
import { deleteTestDocs } from '../../../src/resolvers/queries';

jest.mock('../../../src/models');

describe('delete cypress test documents in the database', () => {
  const mockData = [{ id: '1', email: 'a' }];
  it('should delete documents that are created by e2e test', async () => {
    (userModel.deleteMany as jest.Mock).mockResolvedValue(mockData);
    const result = await deleteTestDocs();
    expect(result).toBe(true);
  });

  it('should throw an error', async () => {
    (userModel.deleteMany as jest.Mock).mockRejectedValue(new Error('lol'));
    expect(deleteTestDocs()).rejects.toThrow('lol');
  });
});
