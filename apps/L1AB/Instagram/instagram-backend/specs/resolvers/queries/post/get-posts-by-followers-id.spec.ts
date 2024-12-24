import { getPostsByFollowersId } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([{ followerId: '3' }, { followerId: '2' }]),
    }),
  },
  postsModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValue([
          {
            _id: '67502569e2f6ddc43a5b1891',
            userId: {
              _id: '3',
              username: 'zorg',
            },
            images: ['https://picsum.photos/200'],
            caption: 'ehend',
            createdAt: '2024-12-24T12:29:25.648Z',
          },
          {
            _id: '673da5414a0c0fa573e0d256',
            userId: {
              _id: '3',
              username: 'zorg',
            },
            images: ['https://picsum.photos/900'],
            caption: 'Hello',
            createdAt: '2024-12-24T12:11:00Z',
          },
        ]),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValue([
          {
            _id: '67502569e2f6ddc43a5b1891',
            userId: {
              _id: '1',
              username: 'gerle',
            },
            images: ['https://picsum.photos/200'],
            caption: 'ehend',
            createdAt: '2024-12-04T09:48:25.648Z',
            updatedAt: '2024-12-04T09:48:25.648Z',
          },
          {
            _id: '673da5414a0c0fa573e0d256',
            userId: {
              _id: '2',
              username: 'zorg',
            },
            images: ['https://picsum.photos/900'],
            caption: 'Hello',
            createdAt: '2024-11-20T09:00:49.947Z',
            updatedAt: '2024-11-20T09:00:49.947Z',
          },
        ]),
      }),
  },
}));
describe('getPostsbyFollowersId', () => {
  let currentDate: Date;

  beforeAll(() => {
    currentDate = new Date('2024-12-24T12:30:00Z');
    jest.spyOn(Date, 'now').mockReturnValueOnce(currentDate.getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('', async () => {
    const res = await getPostsByFollowersId!({}, { followerId: '3' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual([
      {
        _id: '67502569e2f6ddc43a5b1891',
        userId: {
          _id: '3',
          username: 'zorg',
        },
        images: ['https://picsum.photos/200'],
        caption: 'ehend',
        createdAt: '2024-12-24T12:29:25.648Z',
      },
      {
        _id: '673da5414a0c0fa573e0d256',
        userId: {
          _id: '3',
          username: 'zorg',
        },
        images: ['https://picsum.photos/900'],
        caption: 'Hello',
        createdAt: '2024-12-24T12:11:00Z',
      },
      {
        _id: '67502569e2f6ddc43a5b1891',
        userId: {
          _id: '1',
          username: 'gerle',
        },
        images: ['https://picsum.photos/200'],
        caption: 'ehend',
        createdAt: '2024-12-04T09:48:25.648Z',
        updatedAt: '2024-12-04T09:48:25.648Z',
      },
      {
        _id: '673da5414a0c0fa573e0d256',
        userId: {
          _id: '2',
          username: 'zorg',
        },
        images: ['https://picsum.photos/900'],
        caption: 'Hello',
        createdAt: '2024-11-20T09:00:49.947Z',
        updatedAt: '2024-11-20T09:00:49.947Z',
      },
    ]);
  });
});
