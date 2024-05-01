import { accessTokenAuth } from '@/middlewares/auth-token';
import jwt from 'jsonwebtoken';
describe('authenticate access token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const id = '663087c433fbc1529835ca43';
  const name = 'Хэрэглэгч';
  const email = 'ace@gmail.com';
  const accessToken = jwt.sign({ id, name, email }, 'secret-key');
  const mockRequest = {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };

  it('should auth valid access token', async () => {
    const decodedUser = {
      id: '663087c433fbc1529835ca43',
      name: 'Хэрэглэгч',
      email: 'ace@gmail.com',
    };
    const result = (await accessTokenAuth(mockRequest)) as { email: string };
    expect(result.email).toEqual(decodedUser.email);
  });

  it('should throw error when there is no access token', async () => {
    const mockErrorRequest = {
      headers: {
        authorization: ``,
      },
    };
    try {
      await accessTokenAuth(mockErrorRequest);
    } catch (error) {
      expect(error).toEqual(new Error('There is no valid token'));
    }
  });
  it('should throw error when failed to decode token', async () => {
    const req = {
      headers: {
        authorization: 'Bearer test',
      },
    };
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Failed to decode token');
    });
    await expect(accessTokenAuth(req)).rejects.toThrowError('Failed to auth');
  });
});
