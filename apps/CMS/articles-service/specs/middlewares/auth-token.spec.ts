import { accessTokenAuth } from '@/middlewares/auth-token';
import jwt from 'jsonwebtoken';
describe('authenticate access token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const id = '1';
  const name = 'testName';
  const email = 'test@gmail.com';
  const role = 'user';

  const accessToken = jwt.sign({ id, name, email, role }, 'secret-key');
  const mockRequest = {
    authorization: accessToken,
  };

  it('should auth valid access token', async () => {
    const decodedUser = {
      id: '1',
      name: 'testName',
      email: 'test@gmail.com',
    };
    const result = (await accessTokenAuth(mockRequest)) as { email: string };
    expect(result.email).toEqual(decodedUser.email);
  });

  it('should throw error when there is no access token', async () => {
    const mockErrorRequest = {
      authorization: '',
    };
    try {
      await accessTokenAuth(mockErrorRequest);
    } catch (error) {
      expect(error).toEqual(new Error('There is no valid token'));
    }
  });
  it('should throw error when failed to decode token', async () => {
    const req = {
      authorization: 'Bearer test',
    };
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Failed to decode token');
    });
    await expect(accessTokenAuth(req)).rejects.toThrowError('Failed to auth');
  });
});
