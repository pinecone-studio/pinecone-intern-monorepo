import { FollowerModel } from 'apps/L1FG/instagram/backend/src/models';
import { validateFoundFollow } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/validate-found-follow';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate follow', () => {
  it('Should throw already followed error', async () => {
    const mockFindOne = jest.fn().mockResolvedValueOnce({
      _id: '12',
      followerId: '123',
      targetId: '456',
    });
    (FollowerModel.findOne as jest.Mock) = mockFindOne;
    await expect(validateFoundFollow('123', '456')).rejects.toThrow('Already followed');
    expect(mockFindOne).toHaveBeenCalledWith({ followerId: '123', targetId: '456' });
  });
});
