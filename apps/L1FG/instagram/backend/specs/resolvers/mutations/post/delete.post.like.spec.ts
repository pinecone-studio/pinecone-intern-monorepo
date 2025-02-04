import { PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';
import { deletePostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete post like', () => {
  it('model find and delete', async () => {
    (PostLikeModal.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

    if (!deletePostLike) return;

    const result = await deletePostLike({}, { postId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(undefined);
  });
});
