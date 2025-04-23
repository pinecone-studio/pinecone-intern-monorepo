// login.spec.ts
import { login } from 'apps/L2A/leave-request/backend/src/resolvers/mutations/user/login';
import { User } from 'apps/L2A/leave-request/backend/src/models/models';
import * as tokenUtils from 'apps/L2A/leave-request/backend/src/utils/token';


jest.mock('apps/L2A/leave-request/backend/src/models/models');
jest.mock('apps/L2A/leave-request/backend/src/utils/token');

describe('login resolver', () => {
    it('should throw an error if email or password is incorrect', async () => {
       
        (User.findOne as jest.Mock).mockResolvedValueOnce(null);
      
      
        await expect(login({ email: 'test@example.com', password: 'incorrectPassword' }))
          .rejects
          .toThrow('Invalid credentials');
      });
      

  it('should return tokens if login is successful', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      password: 'correctPassword',
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    // Женераци хийх token-ын mock
    (tokenUtils.generateAccessToken as jest.Mock).mockReturnValue('mockAccessToken');
    (tokenUtils.generateRefreshToken as jest.Mock).mockReturnValue('mockRefreshToken');

    const result = // Сайжруулсан код:
    await login({ email: 'test@example.com', password: 'correctPassword' });
    ;
    
    expect(result).toHaveProperty('accessToken', 'mockAccessToken');
    expect(result).toHaveProperty('refreshToken', 'mockRefreshToken');
    expect(result).toHaveProperty('user', mockUser);
  });
});
;
