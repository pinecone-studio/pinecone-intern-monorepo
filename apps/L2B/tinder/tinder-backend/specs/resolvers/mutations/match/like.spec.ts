import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models/profile.model';
import { like } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model');

const mockFindById = profileModel.findById as jest.Mock;

describe('like mutation', () => {
  const likerId = 'user1';
  const likedId = 'user2';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if liker and liked are the same', async () => {
    await expect(like(undefined, { likerId: 'user1', likedId: 'user1' })).rejects.toThrow('Cannot like yourself');
  });

  it('should throw error if one of the profiles is not found', async () => {
    mockFindById.mockResolvedValueOnce(null);

    await expect(like(undefined, { likerId, likedId })).rejects.toThrow('Profile not found');
  });

  it('should return match: true for mutual like', async () => {
    const liker = {
      _id: likerId,
      liked: [],
      disliked: [],
      matched: [],
      save: jest.fn(),
    };

    const liked = {
      _id: likedId,
      liked: [likerId],
      disliked: [likerId],
      matched: [],
      save: jest.fn(),
    };

    mockFindById.mockImplementation((id: string) => {
      if (id === likerId) return Promise.resolve(liker);
      if (id === likedId) return Promise.resolve(liked);
      return null;
    });

    const result = await like(undefined, { likerId, likedId });

    expect(result).toEqual({
      match: true,
      matchedUserId: likedId,
    });

    expect(liker.matched).toContain(likedId);
    expect(liked.matched).toContain(likerId);
    expect(liked.liked).not.toContain(likerId);
    expect(liked.disliked).not.toContain(likerId);
    expect(liker.save).toHaveBeenCalled();
    expect(liked.save).toHaveBeenCalled();
  });

  it('should return match: false for non-mutual like', async () => {
    const liker = {
      _id: likerId,
      liked: [],
      disliked: [],
      matched: [],
      save: jest.fn(),
    };

    const liked = {
      _id: likedId,
      liked: [],
      disliked: [],
      matched: [],
      save: jest.fn(), // will not be called
    };

    mockFindById.mockImplementation((id: string) => {
      if (id === likerId) return Promise.resolve(liker);
      if (id === likedId) return Promise.resolve(liked);
      return null;
    });

    const result = await like(undefined, { likerId, likedId });

    expect(result).toEqual({
      match: false,
      matchedUserId: undefined,
    });

    expect(liker.liked).toContain(likedId);
    expect(liker.save).toHaveBeenCalled();
    expect(liked.save).not.toHaveBeenCalled();
  });
  it('should remove likedId from liker.disliked when present', async () => {
    const liker = {
      _id: likerId,
      liked: [],
      disliked: [likedId, 'user3'],
      matched: [],
      save: jest.fn(),
    };

    const liked = {
      _id: likedId,
      liked: [],
      disliked: [],
      matched: [],
      save: jest.fn(),
    };

    mockFindById.mockImplementation((id: string) => {
      if (id === likerId) return Promise.resolve(liker);
      if (id === likedId) return Promise.resolve(liked);
      return null;
    });

    const result = await like(undefined, { likerId, likedId });

    expect(result).toEqual({
      match: false,
      matchedUserId: undefined,
    });

    expect(liker.disliked).toEqual(['user3']);
    expect(liker.liked).toContain(likedId);
    expect(liker.save).toHaveBeenCalled();
  });
});
