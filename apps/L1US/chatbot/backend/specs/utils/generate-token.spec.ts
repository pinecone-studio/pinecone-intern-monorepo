import jwt from 'jsonwebtoken';
import { generateToken } from '../../src/utils';

jest.mock('jsonwebtoken');

describe('generateToken', () => {
  it('should throw an error if JWT_SECRET is not provided in environment variables', () => {
    delete process.env.JWT_SECRET;

    expect(() => generateToken('userId')).toThrow('JWT secret must be provided');
  });

  it('should generate a token when JWT_SECRET is provided', () => {
    const mockToken = 'mockedToken';
    const userId = 'userId';
    process.env.JWT_SECRET = 'secret';

    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const token = generateToken(userId);

    expect(token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith({ userId }, 'secret', { expiresIn: '4h' });
  });
});