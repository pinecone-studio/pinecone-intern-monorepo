import { MutationCreateUserArgs } from "apps/L2A/real-estate/real-estate-backend/src/generated";
import { USER_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/user";
import { createUser } from "apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations";

jest.mock('apps/L2A/real-estate/real-estate-backend/src/models/user');

describe('createUser resolver', () => {
  const mockArgs: MutationCreateUserArgs = { email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user when email does not exist', async () => {
    // Setup mock responses
    const mockNewUser = {
      _id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      isAdmin: false,
      save: jest.fn()
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValue(null);
    (USER_MODEL.create as jest.Mock).mockResolvedValue(mockNewUser);

    const result = await createUser({}, mockArgs);

    expect(USER_MODEL.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(USER_MODEL.create).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result).toEqual({
      id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      isAdmin: false
    });
  });

  it('should throw error when user already exists', async () => {
    // Setup mock existing user
    const mockExistingUser = {
      _id: '507f1f77bcf86cd799439011',
      email: 'test@example.com'
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValue(mockExistingUser);

    await expect(createUser({}, mockArgs))
      .rejects
      .toThrow('user already exist');
  });

  it('should handle database errors during findOne', async () => {
    (USER_MODEL.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createUser({}, mockArgs))
      .rejects
      .toThrow('Database error');
  });

  it('should handle database errors during create', async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValue(null);
    (USER_MODEL.create as jest.Mock).mockRejectedValue(new Error('Creation failed'));

    await expect(createUser({}, mockArgs))
      .rejects
      .toThrow('Creation failed');
  });

  it('should properly convert ObjectId to string', async () => {
    const mockNewUser = {
      _id: { toString: () => 'converted-id' }, 
      email: 'test@example.com',
      isAdmin: false
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValue(null);
    (USER_MODEL.create as jest.Mock).mockResolvedValue(mockNewUser);

    const result = await createUser({}, mockArgs);

    expect(result.id).toBe('converted-id');
  });

  it('should handle empty email', async () => {
    await expect(createUser({}, { email: '' }))
      .rejects
      .toThrow(); 
  });
});