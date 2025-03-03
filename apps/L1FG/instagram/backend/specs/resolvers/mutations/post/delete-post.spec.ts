import { CommentLikeModel, NotificationModel, PostLikeModal, PostModel, UserModel } from '../../../../src/models';
import { CommentModel } from '../../../../src/models/comment.model';
import { deletePost } from '../../../../src/resolvers/mutations';
// eslint-disable-next-line no-unused-vars
import { authenticate } from '../../../../src/utils/authenticate';
import { UnauthenticatedError } from '../../../../src/utils/error';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');

describe('should render', () => {
  it('SHould throw authentication error', async () => {
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
    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);
    await expect(deletePost({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });

  it('Should successfully return', async () => {
    if (!deletePost) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
      _id: '1234',
    });
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
    (NotificationModel.deleteMany as jest.Mock).mockResolvedValue({});
    (PostLikeModal.deleteMany as jest.Mock).mockResolvedValueOnce({});
    (CommentModel.find as jest.Mock).mockResolvedValueOnce([
      {
        _id: 'qaasdf',
      },
    ]);
    (CommentModel.deleteMany as jest.Mock).mockResolvedValueOnce({});
    (CommentLikeModel.findOneAndDelete as jest.Mock).mockResolvedValue({});
    const result = await deletePost({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1234',
    });
  });
});
