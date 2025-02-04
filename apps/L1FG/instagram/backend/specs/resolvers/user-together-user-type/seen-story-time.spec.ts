import { GraphQLResolveInfo } from 'graphql';
import { StoryModel, StoryViewModel } from '../../../src/models';
import { seenStoryTime } from '../../../src/resolvers/user/user-together-user-type';
jest.mock('../../../src/models');
describe('Seen story time', () => {
  it('Should update seen if no stories there and return 0', async () => {
    if (!seenStoryTime) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValueOnce([]),
    });
    (StoryViewModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce({
      _id: '43',
      ownerId: '34',
      viewerId: '343',
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
      profileImage: 'image',
    };
    const result = await seenStoryTime(parent, {}, { userId: '34' }, {} as GraphQLResolveInfo);
    expect(result).toBe(0);
  });
  it('Should return stories and return storyView seen', async () => {
    if (!seenStoryTime) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValueOnce([
        {
          _id: '42',
        },
      ]),
    });
    (StoryViewModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: '43',
      ownerId: '34',
      viewerId: '343',
      seen: 'fa',
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
      profileImage: 'image',
    };
    const result = await seenStoryTime(parent, {}, { userId: '34' }, {} as GraphQLResolveInfo);
    expect(result).toBe('fa');
  });
  it('Should return stories and return no storyview but 0', async () => {
    if (!seenStoryTime) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValueOnce([
        {
          _id: '42',
        },
      ]),
    });
    (StoryViewModel.findOne as jest.Mock).mockResolvedValueOnce(null);
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
      profileImage: 'image',
    };
    const result = await seenStoryTime(parent, {}, { userId: '34' }, {} as GraphQLResolveInfo);
    expect(result).toBe(0);
  });
});
