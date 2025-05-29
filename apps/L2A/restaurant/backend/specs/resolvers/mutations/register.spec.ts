import { register as registerResolver } from '../../../src/resolvers/mutations/register';
import { UserModel } from '../../../src/models/user.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/user.model'); // Mock the model

const register = registerResolver!;

describe('register resolver', () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (UserModel.create as jest.Mock) = mockCreate;
  });

  it('should create a user and return the user object', async () => {
    const mockInput = {
      username: 'testuser',
      email: 'test@example.com',
    }
    const mockUser = {
      _id: 'user123',
      username: mockInput.username,
      email: mockInput.email,
    };

    mockCreate.mockResolvedValue(mockUser);

    const mockContext = {} as any;
    const mockInfo = {} as GraphQLResolveInfo;

    const result = await register({}, { input: mockInput }, mockContext, mockInfo);

    expect(UserModel.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
    });

    expect(result).toEqual(mockUser);
  });
});
