import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { addUser } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';
import bcrypt from 'bcrypt';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('addUser', () => {
  const mockUser = { _id: '123', email: 'test@gmail.com' };

  it('should hash the password and update the user if user exists', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({ ...mockUser, password: 'hashedPassword' });
    const result = await addUser(null, { email: 'test@gmail.com', password: 'password123' });
    expect(result).toEqual({ ...mockUser, email: 'test@gmail.com', password: 'hashedPassword' });
  });

  it('should throw error if user not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);
    await expect(addUser(null, { email: 'notfound@example.com', password: 'password123' })).rejects.toThrow('failed to add user');
  });
});
