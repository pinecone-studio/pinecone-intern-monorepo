import { PostLikeModal } from 'apps/L1FG/instagram/backend/src/models';
import { getLikedPost } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('getLikedPost Query', () => {
  it('should return the liked post when found', async () => {
    (PostLikeModal.findOne as jest.Mock).mockResolvedValue({
      userId: '1',
      ownerUserId: '2',
      hasLiked: true,
      postId: '12',
    });

    if (!getLikedPost) return;

    const result = await getLikedPost({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      userId: '1',
      ownerUserId: '2',
      hasLiked: true,
      postId: '12',
    });
  });

  it('should return { hasLiked: false } when no like is found', async () => {
    (PostLikeModal.findOne as jest.Mock).mockResolvedValue(null);

    if (!getLikedPost) return;

    const result = await getLikedPost({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({ hasLiked: false });
  });
});
