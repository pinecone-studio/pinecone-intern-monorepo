/*eslint-disable*/
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { getComments } from 'apps/L1FG/instagram/backend/src/resolvers/queries';

jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');

describe('getComments Resolver', () => {
  const mockComments = [
    { _id: '1', comment: 'Test comment', postId: 'post1234' },
    { _id: '2', comment: 'Another comment', postId: 'post1234' },
  ];

  it('should throw Unauthorized error if postId is missing', async () => {
    if (!getComments) {
      return;
    }
    await expect(getComments({}, { input: { postId: '' } }, { userId: 'user123' }, {} as any)).rejects.toThrow('Unauthorized');
  });

  it('should return comments when postId is provided', async () => {
    if (!getComments) {
      return;
    }
    (CommentModel.find as jest.Mock).mockResolvedValue(mockComments);

    const result = await getComments({}, { input: { postId: 'post1234' } }, { userId: 'user123' }, {} as any);

    expect(CommentModel.find).toHaveBeenCalledWith({ postId: 'post1234' });
    expect(result).toEqual(mockComments);
  });
});
