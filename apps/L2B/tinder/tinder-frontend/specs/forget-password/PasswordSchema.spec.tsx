import { passwordSchema } from '@/app/auth/forget-password/_components/PasswordSchema';
import '@testing-library/jest-dom';
describe('passwordSchema', () => {
  it('should pass when password and confirmPassword match and are valid', () => {
    const validData = {
      password: 'StrongPass123',
      confirmPassword: 'StrongPass123',
    };

    const result = passwordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when password is less than 8 characters', () => {
    const invalidData = {
      password: 'short',
      confirmPassword: 'short',
    };

    const result = passwordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().password?._errors).toContain('Password must be at least 8 characters long.');
    }
  });

  it('should fail when password and confirmPassword do not match', () => {
    const mismatchData = {
      password: 'ValidPassword',
      confirmPassword: 'DifferentPassword',
    };

    const result = passwordSchema.safeParse(mismatchData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().confirmPassword?._errors).toContain('Passwords do not match.');
    }
  });
});
