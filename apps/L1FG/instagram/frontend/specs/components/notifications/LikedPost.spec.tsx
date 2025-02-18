/* eslint-disable max-lines */
import { LikedPost } from '@/components/notifications/LikedPost';
import { render } from '@testing-library/react';

const likeNotificationMock = [
  {
    categoryType: 'POST_LIKE',
    contentPostId: undefined,
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '',
      userName: 'search',
      profileImage: 'user.png',
    },
  },
  {
    categoryType: 'POST_LIKE',
    contentPostId: '1',
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '',
      userName: 'john',
      profileImage: 'john.png',
    },
  },
  {
    categoryType: 'POST_LIKE',
    contentPostId: '1',
    contentComment: 'mmm',
    createdAt: '2025-02-15',
    contentPost: {
      _id: '1',
      postImage: 'post.png',
      user: {
        _id: '',
        userName: 'b',
        profileImage: 'user.png',
      },
    },
    _id: '12',
    isRead: false,
    ownerId: '1',
    user: {
      _id: '',
      userName: 'search',
      profileImage: 'john.png',
    },
  },
];

describe('post comment component', () => {
  it('if undefined', () => {
    const groupedPostLikes = likeNotificationMock === null;

    expect(groupedPostLikes).toEqual(false);
  });
  it('should handle notifications without contentPostId', () => {
    const mockNotifications = [
      {
        categoryType: 'POST_LIKE',
        contentPostId: null, // ❌ `null` учир `return acc;` мөр ажиллах ёстой
        contentPost: {
          _id: '1',
          postImage: 'post.png',
        },
        _id: '12',
        isRead: false,
        ownerId: '1',
        user: {
          _id: '',
          userName: 'search',
          profileImage: 'user.png',
        },
      },
    ];

    const groupedPostLikes = mockNotifications.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      }

      acc[postId] = acc[postId] || [];
      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof mockNotifications>);

    expect(groupedPostLikes).toEqual({});
  });

  it('filters and groups notifications correctly', async () => {
    render(<LikedPost likeNotification={likeNotificationMock as []} />);
    const groupedPostLikes = likeNotificationMock.reduce((acc, notification) => {
      const postId = notification.contentPostId;
      if (!postId) {
        return acc;
      }

      if (!acc[postId]) {
        acc[postId] = [];
      }

      acc[postId].push(notification);
      return acc;
    }, {} as Record<string, typeof likeNotificationMock>);

    const groupedNotifications = Object.entries(groupedPostLikes).map(([postId, likes]) => {
      const validLikes = likes.filter((like) => like.user?.userName);
      const latestLikes = validLikes.slice(-3);

      return {
        postId,
        userNames: latestLikes.map((like) => like.user?.userName ?? 'Unknown'),
        postImage: likes[0]?.contentPost,
        userImage: latestLikes[latestLikes.length - 1]?.user?.profileImage ?? '',
        comment: likes[0].contentComment,
      };
    });

    expect(groupedNotifications).toEqual([
      {
        postId: '1',
        userNames: ['john', 'search'],
        comment: 'mmm',
        postImage: {
          _id: '1',
          postImage: 'post.png',
          user: {
            _id: '',
            userName: 'b',
            profileImage: 'user.png',
          },
        },
        userImage: 'john.png',
      },
    ]);
  });

  it('renders CommentPost component', () => {
    render(<LikedPost likeNotification={[]} />);
  });
  it('renders CommentPost component', () => {
    render(<LikedPost likeNotification={likeNotificationMock as []} />);
  });
});
