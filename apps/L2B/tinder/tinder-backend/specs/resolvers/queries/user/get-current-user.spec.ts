import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { getCurrentUser } from 'apps/L2B/tinder/tinder-backend/src/resolvers/queries';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../../../../src/models/', () => ({
  userModel: {
    findById: jest.fn(),
  },
}));

describe('getCurrentUser', () => {
  it('should return the current user if token is valid', async () => {
    const mockToken = 'valid.jwt.token';
    const mockPayload = { _id: 'user123' };
    const mockUser = { _id: 'user123', name: 'Alice', email: 'alice@example.com' };

    (jwt.verify as jest.Mock).mockReturnValue(mockPayload);
    (userModel.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await getCurrentUser({}, { JWT: mockToken });

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
    expect(userModel.findById).toHaveBeenCalledWith(mockPayload._id);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if token is invalid', async () => {
    const mockToken = 'invalid.token';

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid token');
    });

    await expect(getCurrentUser({}, { JWT: mockToken })).rejects.toThrow('invalid token');
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
  });
});
