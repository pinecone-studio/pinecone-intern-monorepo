import '@testing-library/jest-dom';
import { passwordSchema } from '@/app/auth/forget-password/_components/PasswordSchema';

describe('passwordSchema validation', () => {
  test('valid password and matching confirmPassword', () => {
    const input = {
      password: 'ValidPassword123',
      confirmPassword: 'ValidPassword123',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  test('password too short', () => {
    const input = {
      password: 'Short1',
      confirmPassword: 'Short1',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Password must be at least 10 characters long.');
  });

  test('password missing uppercase letter', () => {
    const input = {
      password: 'validpassword123',
      confirmPassword: 'validpassword123',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Password must contain at least one uppercase letter.');
  });

  test('password missing lowercase letter', () => {
    const input = {
      password: 'VALIDPASSWORD123',
      confirmPassword: 'VALIDPASSWORD123',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Password must contain at least one lowercase letter.');
  });

  test('password missing number', () => {
    const input = {
      password: 'ValidPassword',
      confirmPassword: 'ValidPassword',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Password must contain at least one number.');
  });

  test('passwords do not match', () => {
    const input = {
      password: 'ValidPassword123',
      confirmPassword: 'DifferentPassword123',
    };
    const result = passwordSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Passwords do not match.');
  });
});
