import { signUpUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const input = { email: 'test@gmail.com', name: 'test', phone: '1234567890', password: 'test123' };

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('signUpUser resolver', () => {
  const mockFindOne = jest.requireMock('../../../../src/models').userModel.findOne;
  const mockCreate = jest.requireMock('../../../../src/models').userModel.create;
  const mockSign = jest.requireMock('jsonwebtoken').sign;
  const mockGenSalt = jest.requireMock('bcrypt').genSalt;
  const mockHash = jest.requireMock('bcrypt').hash;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SALTROUNDS = '10';
    process.env.JWT_SECRET = 'testsecret';
  });

  it('should sign up a new user successfully', async () => {
    mockFindOne.mockResolvedValue(null); // No existing user or phone
    mockGenSalt.mockResolvedValue('somesalt'); // Mock salt generation
    mockHash.mockResolvedValue('hashedpassword'); // Mock hashed password
    mockCreate.mockResolvedValue({ _id: '1', ...input, password: 'hashedpassword' }); // Mock user creation
    mockSign.mockReturnValue('mockedtoken'); // Mock JWT token generation

    const response = await signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
        email: input.email,
        name: input.name,
        phone: input.phone,
        password: 'hashedpassword',
      },
      token: 'mockedtoken',
    });

    expect(mockFindOne).toHaveBeenCalledTimes(2); // Check for email and phone
    expect(mockGenSalt).toHaveBeenCalledWith(10); // Check salt rounds
    expect(mockHash).toHaveBeenCalledWith(input.password, 'somesalt');
    expect(mockCreate).toHaveBeenCalledWith({
      ...input,
      password: 'hashedpassword',
    });
    expect(mockSign).toHaveBeenCalledWith({ userId: '1' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  });

  it('should throw an error if email already exists', async () => {
    mockFindOne.mockResolvedValueOnce({ _id: '1' }); // Simulate existing user with email

    await expect(signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('User with this email already exists');

    expect(mockFindOne).toHaveBeenCalledWith({ email: input.email });
    expect(mockCreate).not.toHaveBeenCalled(); // Ensure no user is created
  });

  it('should throw an error if phone number already exists', async () => {
    mockFindOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: '2' }); // Simulate existing user with phone

    await expect(signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('User with this phone already exists');

    expect(mockFindOne).toHaveBeenCalledWith({ phone: input.phone });
    expect(mockCreate).not.toHaveBeenCalled(); // Ensure no user is created
  });

  it('should throw a generic error if user creation fails', async () => {
    mockFindOne.mockResolvedValue(null);
    mockGenSalt.mockResolvedValue('somesalt');
    mockHash.mockResolvedValue('hashedpassword');
    mockCreate.mockRejectedValue(new Error('Database error')); // Simulate database error

    await expect(signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Error during user signup');

    expect(mockCreate).toHaveBeenCalled();
  });
});
