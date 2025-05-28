import { MutationCreateProfileArgs } from 'apps/L2B/tinder/tinder-backend/src/generated';
import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models/profile.model';
import { createProfile } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model', () => ({
  profileModel: {
    create: jest.fn(),
  },
}));

describe('createProfile', () => {
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new profile and return it with populated user', async () => {
    const mockInput = {
      user: 'user123',
      interestedIn: 'music',
      age: 25,
      profileInfo: {
        name: 'John Doe',
        bio: 'Developer and music lover',
        interest: 'guitar',
        profession: 'Software Engineer',
        school: 'MIT',
      },
      images: ['img1.png', 'img2.png'],
    };

    const mockCreatedProfile = {
      ...mockInput,
      _id: 'mocked-id',
      populate: jest.fn(),
    };

    const mockPopulatedProfile = {
      ...mockCreatedProfile,
      user: { id: 'user123', name: 'John' },
    };

    (mockCreatedProfile.populate as jest.Mock).mockResolvedValue(mockPopulatedProfile);

    (profileModel.create as jest.Mock).mockResolvedValue(mockCreatedProfile);

    const args: MutationCreateProfileArgs = { input: mockInput };
    const result = await (createProfile as NonNullable<typeof createProfile>)({}, args, {}, info);

    expect(profileModel.create).toHaveBeenCalledWith({
      user: mockInput.user,
      interestedIn: mockInput.interestedIn,
      age: mockInput.age,
      profileInfo: mockInput.profileInfo,
      images: mockInput.images,
    });

    expect(mockCreatedProfile.populate).toHaveBeenCalledWith('user');

    expect(result).toEqual(mockPopulatedProfile);
  });
});
