import { PostModel } from '../../../../src/models';
import { contentPost } from '../../../../src/resolvers/notification/notification-type';

jest.mock('../../../../src/models');

describe('notification post populate type', () => {
  it('shoud have post image', async () => {
    if (!contentPost) {
      return;
    }

    (PostModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      postImage: '.png',
      caption: '',
      userId: '2',
      carouselMediaCount: 2,
      createdAt: '2222-07-22',
      commentCount: 2,
      likeCount: 3,
      hasLiked: false,
      user: {
        _id: '2',
        userName: 'kk',
        friendshipStatus: {
          following: false,
          followedBy: true,
          incomingRequest: true,
          outgoingRequest: false,
        },
        profileImage: '.png',
      },
    });

    const result = await contentPost({ contentPostId: '1' }, {}, {});
    expect(result).toEqual({
      _id: '1',
      postImage: '.png',
      caption: '',
      userId: '2',
      carouselMediaCount: 2,
      createdAt: '2222-07-22',
      commentCount: 2,
      likeCount: 3,
      hasLiked: false,
      user: {
        _id: '2',
        userName: 'kk',
        friendshipStatus: {
          following: false,
          followedBy: true,
          incomingRequest: true,
          outgoingRequest: false,
        },
        profileImage: '.png',
      },
    });
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
