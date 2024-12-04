import { passwordRecovery } from '../../../../src/resolvers/mutations';
import { userModel, accessTokenModel } from '../../../../src/models';
import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');
jest.mock('bcrypt');

describe('passwordRecovery', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'newPassword123';
  const mockAccessToken = 'mockedAccessToken';
  const mockInput = { email: mockEmail, password: mockPassword, accessToken: mockAccessToken };
  const mockUser = { email: mockEmail };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update the user password when input is valid', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (accessTokenModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockAccessToken);

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('mockSalt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('mockHashedPassword');

    (userModel.updateOne as jest.Mock).mockResolvedValue({});

    const result = await passwordRecovery!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(accessTokenModel.findOneAndDelete).toHaveBeenCalledWith({ email: mockEmail });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(expect.any(Number));
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 'mockSalt');
    expect(userModel.updateOne).toHaveBeenCalledWith({ email: mockEmail }, { password: 'mockHashedPassword' });
    expect(result).toBe('Success');
  });

  it('should throw an error if user is not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(passwordRecovery!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');

    expect(userModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(accessTokenModel.findOneAndDelete).not.toHaveBeenCalled();
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });

  it('should throw an error if access token is expired or not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (accessTokenModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(passwordRecovery!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Access Token expired or not found');

    expect(userModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(accessTokenModel.findOneAndDelete).toHaveBeenCalledWith({ email: mockEmail });
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });
});
