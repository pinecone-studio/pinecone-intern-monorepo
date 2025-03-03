import { PostModel } from '../../../../src/models';
import { firstThreePosts } from '../../../../src/resolvers/user/profile-preview-type/first-three-posts';

jest.mock('../../../../src/models');

describe('First three posts', () => {
  it('Should  ', async () => {
    if (!firstThreePosts) return;
    const mockQuery = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([{ _id: '679b1f013deb1906420fce31', title: 'Mock Post' }]),
    };
    const mockFind = jest.fn().mockReturnValue(mockQuery);
    (PostModel.find as jest.Mock) = mockFind;
    const result = await firstThreePosts({ searchingUserId: 'qeaf' });
    expect(result).toEqual([
      {
        // eslint-disable-next-line no-secrets/no-secrets
        cursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        node: { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
      },
    ]);
  });
});
