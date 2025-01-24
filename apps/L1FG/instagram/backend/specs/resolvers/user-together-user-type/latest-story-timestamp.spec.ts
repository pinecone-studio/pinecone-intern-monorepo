jest.mock('../../../src/models');
import { GraphQLResolveInfo } from 'graphql';
import { StoryModel } from '../../../src/models';
import { latestStoryTimestamp } from '../../../src/resolvers/user-together-user-type';
describe('Latest story timestamp', () => {
  it('Should get story', async () => {
    if (!latestStoryTimestamp) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        {
          _id: '3',
          bio: '',
          email: '',
          fullName: '',
          userName: '',
          followingCount: 0,
          followerCount: 0,
          postCount: 0,
          latestStoryTimestamp: 0,
          createdAt: '2',
        },
      ]),
    });
    const parent = {
      _id: '3',
      bio: '',
      email: '',
      fullName: '',
      userName: '',
      followingCount: 0,
      followerCount: 0,
      postCount: 0,
      latestStoryTimestamp: 0,
    };
    const result = await latestStoryTimestamp(parent, {}, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(result).toEqual('2');
  });
  it('Should return 0', async () => {
    if (!latestStoryTimestamp) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });
    const parent = {
      _id: '3',
      bio: '',
      email: '',
      fullName: '',
      userName: '',
      followingCount: 0,
      followerCount: 0,
      postCount: 0,
      latestStoryTimestamp: 0,
    };
    const result = await latestStoryTimestamp(parent, {}, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(result).toBe(0);
  });
});
