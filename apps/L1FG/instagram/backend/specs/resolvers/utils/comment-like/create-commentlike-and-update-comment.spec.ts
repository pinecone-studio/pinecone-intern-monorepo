import { CommentLikeModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { createCommentlikeAndUpdateComment } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/create-commentlike-and-update-comment';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Create comment like and update comment', () => {
  it('Should throw Коммент дээр зүрх дарсангүй', async () => {
    const mockCreate = jest.fn().mockResolvedValue(null);
    (CommentLikeModel.create as jest.Mock) = mockCreate;
    await expect(createCommentlikeAndUpdateComment({ input: { userId: '1', commentId: '2' } })).rejects.toThrow('Коммент дээр зүрх дарсангүй');
  });
  it('Should throw коммент дээр зүрх дарсангүй', async () => {
    const mockCreate = jest.fn().mockResolvedValue({});
    const mockCommentModelFindByIdAndUpdate = jest.fn().mockResolvedValue(null);
    const mockCommentLikeModelFindByIdAndDelete = jest.fn();
    (CommentLikeModel.create as jest.Mock) = mockCreate;
    (CommentModel.findByIdAndUpdate as jest.Mock) = mockCommentModelFindByIdAndUpdate;
    (CommentLikeModel.findByIdAndDelete as jest.Mock) = mockCommentLikeModelFindByIdAndDelete;
    await expect(createCommentlikeAndUpdateComment({ input: { userId: '1', commentId: '2' } })).rejects.toThrow('Коммент дээр зүрх дарсангүй');
    expect(mockCommentLikeModelFindByIdAndDelete).toHaveBeenCalledTimes(1);
  });
  it('Should return commentLike', async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      _id: '1',
      userId: '2',
      commentId: '3',
    });
    const mockCommentModelFindByIdAndUpdate = jest.fn().mockResolvedValue({});
    (CommentLikeModel.create as jest.Mock) = mockCreate;
    (CommentModel.findByIdAndUpdate as jest.Mock) = mockCommentModelFindByIdAndUpdate;
    const result = await createCommentlikeAndUpdateComment({ input: { userId: '1', commentId: '2' } });
    expect(result).toEqual({
      _id: '1',
      userId: '2',
      commentId: '3',
    });
  });
});
