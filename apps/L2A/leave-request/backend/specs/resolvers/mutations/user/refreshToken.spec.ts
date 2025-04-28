import { refreshToken } from 'apps/L2A/leave-request/backend/src/resolvers/mutations/user/refreshtoken'; 
import { generateAccessToken,generateRefreshToken,verifyRefreshToken } from 'apps/L2A/leave-request/backend/src/utils/token';

jest.mock('apps/L2A/leave-request/backend/src/utils/token');

describe('refreshToken mutation', () => {
  it('should return new access token and refresh token when the refresh token is valid', async () => {
    const validRefreshToken = 'valid-refresh-token';
    const decoded = { userId: 'user123' };
    const expectedNewAccessToken = 'new-access-token';
    const expectedNewRefreshToken = 'new-refresh-token';

  
    (verifyRefreshToken as jest.Mock).mockReturnValueOnce(decoded);
    (generateAccessToken as jest.Mock).mockReturnValueOnce(expectedNewAccessToken);
    (generateRefreshToken as jest.Mock).mockReturnValueOnce(expectedNewRefreshToken);

 
    const result = await refreshToken(null, { token: validRefreshToken });

    expect(result).toEqual({
      accessToken: expectedNewAccessToken,
      refreshToken: expectedNewRefreshToken,
    });

    
    expect(verifyRefreshToken).toHaveBeenCalledWith(validRefreshToken);
    expect(generateAccessToken).toHaveBeenCalledWith(decoded.userId);
    expect(generateRefreshToken).toHaveBeenCalledWith(decoded.userId);
  });

  it('should throw an error if the refresh token is invalid or expired', async () => {
    const invalidRefreshToken = 'invalid-refresh-token';

    
    (verifyRefreshToken as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid or expired token');
    });

   
    await expect(refreshToken(null, { token: invalidRefreshToken }))
      .rejects
      .toThrow('Refresh token is invalid or expired');

   
    expect(verifyRefreshToken).toHaveBeenCalledWith(invalidRefreshToken);
  });
});




