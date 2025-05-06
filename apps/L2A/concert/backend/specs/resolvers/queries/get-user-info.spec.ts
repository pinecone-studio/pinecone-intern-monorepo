import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../../../src/utils/find-user-by-email';
import { GetUserInfo } from '../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
import { catchError } from '../../../src/utils/catch-error';

jest.mock('jsonwebtoken');
jest.mock('../../../src/utils/find-user-by-email');
jest.mock('../../../src/utils/catch-error');

describe('GetUserInfo resolver', () => {
  const fakeJWT = 'some.jwt.token';
  const mockDecoded = { id: '123', email: 'test@example.com' };
  const mockUser = { id: '123', email: 'test@example.com', name: 'Test User' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify JWT and return user', async () => {
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    if (GetUserInfo) {
      const result = await GetUserInfo({}, { JWT: fakeJWT }, {}, {} as GraphQLResolveInfo);

      expect(jwt.verify).toHaveBeenCalledWith(fakeJWT, process.env.JWT_SECRET);
      expect(findUserByEmail).toHaveBeenCalledWith(mockDecoded.email);
      expect(result).toEqual(mockUser);
    }
  });

  it('should catch error if jwt.verify throws', async () => {
    const error = new Error('invalid token');
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw error;
    });

    if (GetUserInfo) {
      await GetUserInfo({}, { JWT: fakeJWT }, {}, {} as GraphQLResolveInfo);

      expect(catchError).toHaveBeenCalledWith(error);
    }
  });
});
