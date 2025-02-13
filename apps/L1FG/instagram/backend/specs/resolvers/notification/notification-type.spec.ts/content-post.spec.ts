import { PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { contentPost } from 'apps/L1FG/instagram/backend/src/resolvers/notification/notification-type';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('notification post populate type', () => {
  it('shoud have post image', async () => {
    if (!contentPost) {
      return;
    }

    (PostModel.findById as jest.Mock).mockResolvedValue({
      postImage: ['png', 'png1'],
    });

    const result = await contentPost({ contentPostId: '1' }, {}, {});
    expect(result).toEqual('png');
  });
  it('shoud have post image', async () => {
    if (!contentPost) {
      return;
    }

    const result = await contentPost({ contentPostId: null }, {}, {});
    expect(result).toBeNull();
  });
  it('shoud have post image', async () => {
    if (!contentPost) {
      return;
    }

    (PostModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(contentPost({ contentPostId: '1' }, {}, {})).rejects.toThrow('not found post');
  });
});
