import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models/profile.model';
import { dislike } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model');

describe('dislike mutation', () => {
  const likerId = 'user1';
  const likedId = 'user2';

  let liker: any;
  let liked: any;

  beforeEach(() => {
    liker = {
      liked: [likedId],
      disliked: [],
      matched: [likedId],
      save: jest.fn(),
    };

    liked = {
      matched: [likerId],
      save: jest.fn(),
    };

    profileModel.findById = jest.fn((id) => {
      if (id === likerId) return Promise.resolve(liker);
      if (id === likedId) return Promise.resolve(liked);
      return Promise.resolve(null);
    });
  });

  it('should move likedId from liked to disliked, remove match, and save both users', async () => {
    const result = await dislike(undefined, { likerId, likedId });

    expect(liker.liked).not.toContain(likedId);
    expect(liker.disliked).toContain(likedId);
    expect(liker.matched).not.toContain(likedId);
    expect(liked.matched).not.toContain(likerId);

    expect(liker.save).toHaveBeenCalled();
    expect(liked.save).toHaveBeenCalled();

    expect(result).toEqual({
      match: false,
      matchedUserId: undefined,
    });
  });

  it('should throw if a profile is not found', async () => {
    profileModel.findById = jest.fn(() => Promise.resolve(null));

    await expect(dislike(null, { likerId, likedId })).rejects.toThrow('Profile not found');
  });
});
