import { PostModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { deletePost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
// eslint-disable-next-line no-unused-vars
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { UnauthenticatedError } from 'apps/L1FG/instagram/backend/src/utils/error';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');

describe('should render', () => {
  it('delete follow', async () => {
    if (!deletePost) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new UnauthenticatedError('та нэвтэрнэ үү');
    });
    await expect(deletePost({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo)).rejects.toThrow('та нэвтэрнэ үү');
  });
  it('Should throw ', async () => {
    if (!deletePost) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (PostModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await expect(deletePost({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
  it('Should successfully return', async () => {
    if (!deletePost) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (PostModel.findOneAndDelete as jest.Mock).mockResolvedValueOnce({});
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
    const result = await deletePost({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({});
  });
});
