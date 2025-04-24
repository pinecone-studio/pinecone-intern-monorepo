import { createUser } from '../../../../src/resolvers/mutations/user/create-user';
import { User } from '../../../../src/models/models';

jest.mock('../../../../src/models/models');
describe('User mutation createUser resolver', () => {
  it('should throw an error if email must be valid', async () => {
    const args = {
      username: 'john',
      email: 'john@example',
      profilePicture: 'url.jpg',
      role: 'admin',
    };
    await expect(createUser({}, args)).rejects.toThrow('Email must be valid');
  });
  it('should throw an error if role must be valid', async () => {
    const args = {
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'sdfdsf',
    };
    await expect(createUser({}, args)).rejects.toThrow('Role must be valid');
  });
  it('should throw an error if username already exists', async () => {
    (User.findOne as unknown as jest.Mock).mockImplementation(() => [{ _id: 'mockId' }]);

    const args = {
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'admin',
    };
    await expect(createUser({}, args)).rejects.toThrow('This username already exists');
  });

  it('should throw an error if email already exists', async () => {
    (User.findOne as unknown as jest.Mock).mockImplementation(() => []);
    (User.findOne as unknown as jest.Mock).mockImplementation(() => [{ _id: 'mockId' }]);

    const args = {
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'admin',
    };
    await expect(createUser({}, args)).rejects.toThrow('This username already exists');
  });

  it('should create and return a new user successfully', async () => {
    const mockSave = jest.fn().mockResolvedValue(undefined);

    const mockUserInstance = {
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'admin',
      save: mockSave,
    };

    (User as unknown as jest.Mock).mockImplementation(() => mockUserInstance);
    (User.findOne as unknown as jest.Mock).mockResolvedValue(null);

    const args = {
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'admin',
    };

    const result = await createUser({}, args);

    expect(User).toHaveBeenCalledWith({
      username: 'john',
      email: 'john@example.com',
      profilePicture: 'url.jpg',
      role: 'admin',
    });
    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual(mockUserInstance);
  });
  it('should create and return a new user fails', async () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      profilePicture: 'pic.jpg',
      role: 'admin',
    };
    const mockSave = jest.fn().mockRejectedValue(new Error('DB error'));

    (User as unknown as jest.Mock).mockImplementation(() => ({
      ...mockUserData,
      save: mockSave,
    }));

    await expect(
      createUser(
        {},
        {
          username: mockUserData.username,
          email: mockUserData.email,
          profilePicture: mockUserData.profilePicture,
          role: 'admin',
        }
      )
    ).rejects.toThrow('Error creating user');
  });
});
