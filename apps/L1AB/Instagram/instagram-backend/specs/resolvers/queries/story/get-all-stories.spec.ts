import { getAllStories } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([{ followerId: '3' }, { followerId: '2' }]),
    }),
  },
  storyModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce([
          {
            createdAt: new Date('2024-01-03T12:00:00Z'),
            _id: 'story1',
            image: 'https://image1.jpg',
            userId: {
              _id: '3',
              username: 'zorg',
            },
          },
          {
            createdAt: new Date('2024-01-03T10:00:00Z'),
            _id: 'story1',
            image: 'https://image1.jpg',
            userId: {
              _id: '3',
              username: 'zorg',
            },
          },
        ]),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce([
          {
            createdAt: new Date('2024-01-01T12:00:00Z'),
            _id: 'story1',
            image: 'https://image1.jpg',
            userId: {
              _id: 'user1',
              username: 'zorg',
            },
          },
          {
            createdAt: new Date('2024-01-03T12:00:00Z'),
            _id: 'story2',
            image: 'https://image2.jpg',
            userId: {
              _id: 'user2',
              username: 'gerlee',
            },
          },
          {
            createdAt: new Date('2024-01-03T12:00:00Z'),
            _id: 'story3',
            image: 'https://image3.jpg',
            userId: {
              _id: 'user3',
              username: 'alice',
            },
          },
        ]),
      }),
  },
}));

describe('getAllStories resolver', () => {
  let currentDate: Date;

  beforeAll(() => {
    currentDate = new Date('2024-01-03T12:00:00Z');
    jest.spyOn(Date, 'now').mockReturnValueOnce(currentDate.getTime()).mockReturnValueOnce(currentDate.getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return all stories that are within the last 24 hours, sorted by date', async () => {
    const res = await getAllStories!({}, { followerId: '3' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual([
      {
        createdAt: new Date('2024-01-03T10:00:00Z'),
        _id: 'story1',
        image: 'https://image1.jpg',
        userId: {
          _id: '3',
          username: 'zorg',
        },
      },
      {
        createdAt: new Date('2024-01-03T12:00:00Z'),
        _id: 'story1',
        image: 'https://image1.jpg',
        userId: {
          _id: '3',
          username: 'zorg',
        },
      },
      {
        createdAt: new Date('2024-01-03T12:00:00Z'),
        _id: 'story2',
        image: 'https://image2.jpg',
        userId: {
          _id: 'user2',
          username: 'gerlee',
        },
      },
      {
        createdAt: new Date('2024-01-03T12:00:00Z'),
        _id: 'story3',
        image: 'https://image3.jpg',
        userId: {
          _id: 'user3',
          username: 'alice',
        },
      },
    ]);
  });
});
