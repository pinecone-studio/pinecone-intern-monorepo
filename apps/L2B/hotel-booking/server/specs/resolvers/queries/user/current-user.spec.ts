import { userModel } from 'apps/L2B/hotel-booking/server/src/models';
import { getCurrentUser } from 'apps/L2B/hotel-booking/server/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('apps/L2B/hotel-booking/server/src/models');

describe('getCurrentUser resolver', () => {
  const fakeJWT = 'test-secret';
  const mockDecoded = { id: '123', email: 'test@email.com' };
  const mockUser = { id: '123', email: 'test@email.com', firstName: 'name' };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should verify JWT and return user', async () => {
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await getCurrentUser!({}, { JWT: fakeJWT }, {}, {} as GraphQLResolveInfo);

    expect(jwt.verify).toHaveBeenCalledWith(fakeJWT, 'test-secret');
    expect(userModel.findOne).toHaveBeenCalledWith({ email: mockDecoded.email });
    expect(result).toEqual(mockUser);
  });

  it('should throw error if jwt.verify fails', async () => {
    const error = new Error('invalid token');
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(getCurrentUser!({}, { JWT: fakeJWT }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('invalid token');
  });
});
