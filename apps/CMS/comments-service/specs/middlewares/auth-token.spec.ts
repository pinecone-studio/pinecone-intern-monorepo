import { accessTokenAuth } from '@/middlewares/auth-token';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
describe('authenticate access token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const id = '663087c433fbc1529835ca43';
  const name = 'Хэрэглэгч';
  const email = 'ace@gmail.com';
  const accessToken = jwt.sign({ id, name, email }, 'secret-key');
  const iat = jwtDecode(accessToken).iat;
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
      iat: iat,
    };
    const result = await accessTokenAuth(mockRequest);
    expect(result).toEqual(decodedUser);
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
