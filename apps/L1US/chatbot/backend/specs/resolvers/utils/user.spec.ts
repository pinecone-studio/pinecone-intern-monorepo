import { validateRegisterUserInput } from '../../../src/utils';
import { isEmail, isStrongPassword } from 'validator';

jest.mock('validator');

describe('validateRegisterUserInput', () => {
  it('should throw an error if the email is invalid', () => {
    const invalidEmail = 'invalid-email';
    const password = 'StrongPass1!';

    (isEmail as jest.Mock).mockReturnValue(false);

    expect(() => validateRegisterUserInput(invalidEmail, password)).toThrow('Invalid email format');
  });

  it('should throw an error if the password is not strong enough', () => {
    const email = 'test@example.com';
    const invalidPassword = 'weakpassword';

    (isEmail as jest.Mock).mockReturnValue(true);
    (isStrongPassword as jest.Mock).mockReturnValue(false);

    expect(() => validateRegisterUserInput(email, invalidPassword)).toThrow(
      'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'
    );
  });

  it('should not throw an error if the email and password are valid', () => {
    const validEmail = 'test@example.com';
    const validPassword = 'StrongPass1!';

    (isEmail as jest.Mock).mockReturnValue(true);
    (isStrongPassword as jest.Mock).mockReturnValue(true);

    expect(() => validateRegisterUserInput(validEmail, validPassword)).not.toThrow();
  });
});
