/* eslint-disable max-lines */
import { Usermodel } from 'src/models/user';
import { getUser } from 'src/resolvers/queries';

jest.mock('src/models/user');

describe('getUser resolver', () => {
  const mockPopulate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mapped user when found', async () => {
    const userId = '123';

    const matchedUser = {
      _id: '456',
      name: 'Bob',
      email: 'bob@example.com',
      images: ['img1.jpg'],
      profession: 'Developer',
      schoolWork: 'University',
      bio: 'Bio text',
      gender: 'male',
      genderPreferences: 'female',
      interests: [{ _id: '1', interestName: 'Coding' }],
      dateOfBirth: '1990-01-01',
    };

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }, matchedUser],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(Usermodel.findById).toHaveBeenCalledWith(userId);
    expect(mockPopulate).toHaveBeenCalledWith('interests');
    expect(mockPopulate).toHaveBeenCalledWith('likedBy');
    expect(mockPopulate).toHaveBeenCalledWith('likedTo');
    expect(mockPopulate).toHaveBeenCalledWith(
      expect.objectContaining({
        path: 'matchIds',
        populate: expect.objectContaining({
          path: 'users',
          select: expect.any(String),
        }),
      })
    );

    expect(userDoc.toObject).toHaveBeenCalled();

    expect(result).toEqual({
      id: userId,
      email: 'alice@example.com',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      name: 'Alice',
      matchIds: [
        {
          id: 'match1',
          startedConversation: true,
          unmatched: false,
          matchedAt: match.matchedAt,
          matchedUser: {
            id: '456',
            name: 'Bob',
            email: 'bob@example.com',
            images: ['img1.jpg'],
            profession: 'Developer',
            schoolWork: 'University',
            bio: 'Bio text',
            gender: 'male',
            genderPreferences: 'female',
            interests: [{ _id: '1', interestName: 'Coding' }],
            dateOfBirth: '1990-01-01',
          },
        },
      ],
    });
  });

  it('should handle matched user with null/invalid interests', async () => {
    const userId = '123';

    const matchedUser = {
      _id: '456',
      name: 'Bob',
      email: 'bob@example.com',
      images: ['img1.jpg'],
      profession: 'Developer',
      schoolWork: 'University',
      bio: 'Bio text',
      gender: 'male',
      genderPreferences: 'female',
      interests: [{ _id: '1', interestName: 'Coding' }, null, { _id: null, interestName: 'Invalid' }, { _id: '2', interestName: 'Sports' }],
      dateOfBirth: '1990-01-01',
    };

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }, matchedUser],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser.interests).toEqual([
      { _id: '1', interestName: 'Coding' },
      { _id: '2', interestName: 'Sports' },
    ]);
  });

  it('should handle matched user with empty interests array', async () => {
    const userId = '123';

    const matchedUser = {
      _id: '456',
      name: 'Bob',
      email: 'bob@example.com',
      images: ['img1.jpg'],
      profession: 'Developer',
      schoolWork: 'University',
      bio: 'Bio text',
      gender: 'male',
      genderPreferences: 'female',
      interests: [],
      dateOfBirth: '1990-01-01',
    };

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }, matchedUser],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser.interests).toBeNull();
  });

  it('should handle matched user with no interests property', async () => {
    const userId = '123';

    const matchedUser = {
      _id: '456',
      name: 'Bob',
      email: 'bob@example.com',
      images: ['img1.jpg'],
      profession: 'Developer',
      schoolWork: 'University',
      bio: 'Bio text',
      gender: 'male',
      genderPreferences: 'female',
      dateOfBirth: '1990-01-01',
    };

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }, matchedUser],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser.interests).toBeNull();
  });

  it('should handle user with no matchIds', async () => {
    const userId = '123';

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: null,
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: null,
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds).toEqual([]);
  });

  it('should handle match with no users array', async () => {
    const userId = '123';

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: null, // Test null users array
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser).toBeNull();
  });

  it('should handle match where no other user is found', async () => {
    const userId = '123';

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser).toBeNull();
  });

  it('should handle matched user with interests containing only null values', async () => {
    const userId = '123';

    const matchedUser = {
      _id: '456',
      name: 'Bob',
      email: 'bob@example.com',
      images: ['img1.jpg'],
      profession: 'Developer',
      schoolWork: 'University',
      bio: 'Bio text',
      gender: 'male',
      genderPreferences: 'female',
      interests: [null, null, { _id: null, interestName: 'Invalid' }],
      dateOfBirth: '1990-01-01',
    };

    const match = {
      _id: 'match1',
      startedConversation: true,
      unmatched: false,
      matchedAt: new Date('2025-08-26T12:25:20.603Z'),
      users: [{ _id: userId }, matchedUser],
    };

    const userDoc = {
      _id: userId,
      email: 'alice@example.com',
      name: 'Alice',
      interests: [{ _id: '2', interestName: 'Reading' }],
      profession: 'Engineer',
      schoolWork: 'College',
      images: ['img2.jpg'],
      likedBy: [],
      likedTo: [],
      bio: 'User bio',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      matchIds: [match],
      toObject: jest.fn().mockReturnValue({
        _id: userId,
        email: 'alice@example.com',
        name: 'Alice',
        interests: [{ _id: '2', interestName: 'Reading' }],
        profession: 'Engineer',
        schoolWork: 'College',
        images: ['img2.jpg'],
        likedBy: [],
        likedTo: [],
        bio: 'User bio',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        matchIds: [match],
      }),
    };

    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(userDoc);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    const result = await getUser({}, { _id: userId });

    expect(result.matchIds[0].matchedUser.interests).toBeNull();
  });

  it('should throw error when user not found', async () => {
    mockPopulate.mockReturnValue({ populate: mockPopulate });
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce({ populate: mockPopulate }).mockReturnValueOnce(null);

    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    await expect(getUser({}, { _id: 'notfound' })).rejects.toThrow('User not found');
  });
});
