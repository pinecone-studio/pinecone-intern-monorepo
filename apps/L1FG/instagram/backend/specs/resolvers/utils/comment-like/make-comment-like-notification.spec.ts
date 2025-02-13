import { CommentLikeModel, NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { makeCommentLikeNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/make-comment-like-notification';

describe('make comment like notification', () => {
  it('Should throw Мэдээлэл үүсэхэд алдаа гарлаа', async () => {
    const commentLike = {
      _id: '1',
      commentId: '2',
      userId: '3',
    };
    const mockCreate = jest.fn().mockResolvedValueOnce(null);
    const mockFindByIdAndDelete = jest.fn();
    const mockFindByIdAndUpdate = jest.fn();
    (NotificationModel.create as jest.Mock) = mockCreate;
    (CommentLikeModel.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
    (CommentModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(
      makeCommentLikeNotification({
        commentLike,
        input: {
          userId: '12',
          ownerUserId: '34',
          postId: '56',
          commentId: '78',
        },
      })
    ).rejects.toThrow('Мэдээлэл үүсэхэд алдаа гарлаа');
    expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(1);
  });
});
