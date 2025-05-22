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

  it('should create a new profile and return it', async () => {
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

    const mockProfile = { ...mockInput, _id: 'mocked-id' };

    (profileModel.create as jest.Mock).mockResolvedValue(mockProfile);

    const args: MutationCreateProfileArgs = { input: mockInput };
    const result = await (createProfile as NonNullable<typeof createProfile>)({}, args, {}, info);

    expect(profileModel.create).toHaveBeenCalledWith({
      user: mockInput.user,
      interestedIn: mockInput.interestedIn,
      age: mockInput.age,
      profileInfo: mockInput.profileInfo,
      images: mockInput.images,
    });

    expect(result).toEqual(mockProfile);
  });
});
