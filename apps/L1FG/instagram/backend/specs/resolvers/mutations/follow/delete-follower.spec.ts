/* eslint-disable @nx/enforce-module-boundaries */
import { FollowerModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { deleteFollower } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
// eslint-disable-next-line no-unused-vars
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { UnauthenticatedError } from 'apps/L1FG/instagram/backend/src/utils/error';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');

describe('should render', () => {
  it('delete follow', async () => {
    if (!deleteFollower) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new UnauthenticatedError('та нэвтэрнэ үү');
    });
    await expect(deleteFollower({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo)).rejects.toThrow('та нэвтэрнэ үү');
  });
  it('Should throw ', async () => {
    if (!deleteFollower) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await expect(deleteFollower({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
  it('Should successfully return', async () => {
    if (!deleteFollower) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce({});
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
    const result = await deleteFollower({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      isFollowed: false,
      isRequested: false,
    });
  });
});
