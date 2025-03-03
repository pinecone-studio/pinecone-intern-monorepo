import { CommentModel } from '../../../../src/models/comment.model';
import { contentComment } from '../../../../src/resolvers/notification/notification-type';

jest.mock('../../../../src/models/comment.model');

describe('notification post populate type', () => {
  it('shoud have post image', async () => {
    if (!contentComment) {
      return;
    }

    (CommentModel.findById as jest.Mock).mockResolvedValue({
      comment: 'aan',
    });

    const result = await contentComment({ contentCommentId: '1' }, {}, {});
    expect(result).toEqual('aan');
  });
  it('shoud have post image', async () => {
    if (!contentComment) {
      return;
    }

    const result = await contentComment({ contentCommentId: null }, {}, {});
    expect(result).toBeNull();
  });
  it('shoud have post image', async () => {
    if (!contentComment) {
      return;
    }

    (CommentModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(contentComment({ contentCommentId: '1' }, {}, {})).rejects.toThrow('not found comment');
  });
});
