import { PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';
import { deletePostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete post like', () => {
  it('model find and delete', async () => {
    if (!deletePostLike) return;
    (PostLikeModal.findOneAndDelete as jest.Mock).mockResolvedValue({
      _id: '12',
      userId: '34',
      postId: '352',
    });

    const result = await deletePostLike({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '12',
      userId: '34',
      postId: '352',
    });
  });
});
