import { createUser } from '../../../../src/resolvers/mutations/user/create-user';
import { User } from '../../../../src/models/models';

jest.mock('../../../../src/models/models');

describe('User mutation createUser resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if email must be valid', async () => {
    const args = {
      userArgs: {
        username: 'john',
        email: 'invalidemail',
        profilePicture: 'url.jpg',
      },
    };

    await expect(createUser({}, args)).rejects.toThrow('Email must be valid');
  });

  it('should throw an error if username already exists', async () => {
   
    (User.findOne as unknown as jest.Mock).mockResolvedValueOnce({ _id: 'mockId' });

    const args = {
      userArgs: {
        username: 'john',
        email: 'john@example.com',
        profilePicture: 'url.jpg',
      },
    };

    await expect(createUser({}, args)).rejects.toThrow('This username already exists');
  });

  it('should throw an error if email already exists', async () => {
   
    (User.findOne as unknown as jest.Mock).mockResolvedValueOnce(null);
  
    (User.findOne as unknown as jest.Mock).mockResolvedValueOnce({ _id: 'mockId' });

    const args = {
      userArgs: {
        username: 'john',
        email: 'john@example.com',
        profilePicture: 'url.jpg',
      },
    };

    await expect(createUser({}, args)).rejects.toThrow('This email already exists');
  });

  it('should create and return a new user successfully', async () => {
    const mockSave = jest.fn().mockResolvedValue(undefined);

    const mockUserInstance = {
      _id: 'mockUserId',
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      save: mockSave,
    };

    (User as unknown as jest.Mock).mockImplementation(() => mockUserInstance);
    (User.findOne as unknown as jest.Mock).mockResolvedValue(null);

    const args = {
      userArgs: {
        username: 'john',
        email: 'john@example.com',
        profilePicture: 'url.jpg',
      },
    };

    const result = await createUser({}, args);

    expect(User).toHaveBeenCalledWith({
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
    });

    expect(mockSave).toHaveBeenCalled();
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual(mockUserInstance);
  });

  it('should throw an error if user save fails', async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error('DB error'));

    (User as unknown as jest.Mock).mockImplementation(() => ({
      username: 'testuser',
      email: 'test@example.com',
      profilePicture: 'pic.jpg',
      save: mockSave,
    }));

    (User.findOne as unknown as jest.Mock).mockResolvedValue(null);

    const args = {
      userArgs: {
        username: 'testuser',
        email: 'test@example.com',
        profilePicture: 'pic.jpg',
      },
    };

    await expect(createUser({}, args)).rejects.toThrow('Error creating user: Error: DB error');
  });
});


