import { validateEmail, checkIfUserExists } from '../../../../src/resolvers/mutations/user/user-helpers';
import { User } from '../../../../src/models/models';

jest.mock('../../../../src/models/models');
describe('User helpers', () => {
  describe('validateEmail', () => {
    it('should throw an error if email is not valid', () => {
      expect(() => validateEmail('sdfdsf')).toThrow('Email must be valid');
    });
    it('should throw an error if role is not valid', () => {
      expect(() => validateEmail('sdff')).toThrow('Email must be valid');
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
