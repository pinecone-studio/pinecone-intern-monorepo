import { validateUserInput, checkIfUserExists } from '../../../../src/resolvers/mutations/user/user-helpers';
import { User } from '../../../../src/models/models';

jest.mock('../../../../src/models/models');
describe('User helpers', () => {
  describe('validateUserInput', () => {
    it('should throw an error if username is empty', () => {
      const args = {
        username: '',
        email: 'john@example',
        profilePicture: 'url.jpg',
      };
      expect(() => validateUserInput(args)).toThrow('Username is required');
    });
    it('should throw an error if email is empty', () => {
      const args = {
        username: 'john',
        email: '',
        profilePicture: 'url.jpg',
      };
      expect(() => validateUserInput(args)).toThrow('Email is required');
    });
    it('should throw an error if email is not valid', () => {
      const args = {
        username: 'john',
        email: 'john@example',
        profilePicture: 'url.jpg',
      };
      expect(() => validateUserInput(args)).toThrow('Email must be valid');
    });
    it('should throw an error if profile picture is empty', () => {
      const args = {
        username: 'john',
        email: 'john@example.com',
        profilePicture: '',
      };
      expect(() => validateUserInput(args)).toThrow('Profile picture is required');
    });
  });
  describe('checkIfUserExists', () => {
    const args = {
      username: 'john',
      email: 'john@example.com',
    };
    it('should throw an error if username already exists', async () => {
      (User.findOne as unknown as jest.Mock).mockImplementation(() => [{ _id: 'mockId' }]);
      await expect(checkIfUserExists(args)).rejects.toThrow('This username already exists');
    });
    it('should throw an error if email already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: 'mockId' });
      await expect(checkIfUserExists(args)).rejects.toThrow('This email already exists');
    });
  });
});
