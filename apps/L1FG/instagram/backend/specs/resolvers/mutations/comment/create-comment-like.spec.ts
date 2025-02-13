/*eslint-disable*/
import { createCommentLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { createCommentlikeAndUpdateComment } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/create-commentlike-and-update-comment';
import { makeCommentLikeNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/make-comment-like-notification';
import { validateCommentlikeCommentOwneruser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/validate-commentlike-comment-owneruser';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/create-commentlike-and-update-comment');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/make-comment-like-notification');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/validate-commentlike-comment-owneruser');
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
describe('describe', () => {
  it('Should throw an Unauthorized error if user is not authenticated', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new Error('Unauthorized');
    });

    await expect(createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('Should throw коммент дээр зүрх дарсан байна', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentlikeCommentOwneruser as jest.Mock) = jest.fn(() => {
      throw new Error('коммент дээр зүрх дарсан байна');
    });
    await expect(createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow(
      'коммент дээр зүрх дарсан байна'
    );
  });
  it('Should throw коммент байхгүй байна', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentlikeCommentOwneruser as jest.Mock) = jest.fn(() => {
      throw new Error('коммент байхгүй байна');
    });
    await expect(createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow('коммент байхгүй байна');
  });
  it('Should throw постны эзэмшигч байхгүй байна', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentlikeCommentOwneruser as jest.Mock) = jest.fn(() => {
      throw new Error('постны эзэмшигч байхгүй байна');
    });
    await expect(createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow(
      'постны эзэмшигч байхгүй байна'
    );
  });
  it('Should throw Коммент дээр зүрх дарсангүй', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentlikeCommentOwneruser as jest.Mock) = jest.fn();
    (createCommentlikeAndUpdateComment as jest.Mock) = jest.fn(() => {
      throw new Error('Коммент дээр зүрх дарсангүй');
    });
    await expect(createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Коммент дээр зүрх дарсангүй'
    );
  });
  it('Should return commentLike', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentlikeCommentOwneruser as jest.Mock) = jest.fn();
    (createCommentlikeAndUpdateComment as jest.Mock) = jest.fn().mockResolvedValue({
      _id: '12',
      userId: '34',
      commentId: '56',
    });
    (makeCommentLikeNotification as jest.Mock) = jest.fn();
    const result = await createCommentLike({}, { input: { commentId: '123', postId: '456', ownerUserId: '789' } }, { userId: 'user123' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '12',
      userId: '34',
      commentId: '56',
    });
  });
});
