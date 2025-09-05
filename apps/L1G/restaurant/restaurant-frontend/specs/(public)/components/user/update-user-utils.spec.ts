import { phoneSchema, emailSchema, passwordSchema, formSchema } from '@/utils/update-user-utils';
import '@testing-library/jest-dom';
describe('Form Schemas Validation', () => {
  describe('phoneSchema', () => {
    it('should pass with valid phone number', () => {
      const result = phoneSchema.safeParse({ phone: '99119911' });
      expect(result.success).toBe(true);
    });

    it('should fail with short phone number', () => {
      const result = phoneSchema.safeParse({ phone: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Утасны дугаар шаардлагтай.');
      }
    });
  });

  describe('emailSchema', () => {
    it('should pass with valid email', () => {
      const result = emailSchema.safeParse({ email: 'test@example.com' });
      expect(result.success).toBe(true);
    });

    it('should fail with invalid email', () => {
      const result = emailSchema.safeParse({ email: 'invalid' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Имэйл хаяг буруу байна.');
      }
    });
  });

  describe('passwordSchema', () => {
    it('should pass when passwords match', () => {
      const result = passwordSchema.safeParse({
        currentPassword: 'oldpass',
        newPassword: 'newpassword',
        confirmPassword: 'newpassword',
      });
      expect(result.success).toBe(true);
    });

    it('should fail when passwords do not match', () => {
      const result = passwordSchema.safeParse({
        currentPassword: 'oldpass',
        newPassword: 'newpassword',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Нууц үг таарахгүй байна.');
        expect(result.error.issues[0].path).toEqual(['confirmPassword']);
      }
    });
  });

  describe('formSchema', () => {
    it('should pass with valid values', () => {
      const result = formSchema.safeParse({
        phone: '99119911',
        email: 'test@example.com',
        oldPassword: 'oldpass',
        newPassword: 'newpassword',
        confirmPassword: 'newpassword',
      });
      expect(result.success).toBe(true);
    });

    it('should fail when confirmPassword does not match', () => {
      const result = formSchema.safeParse({
        phone: '99119911',
        email: 'test@example.com',
        oldPassword: 'oldpass',
        newPassword: 'newpassword',
        confirmPassword: 'wrong',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Нууц үг таарахгүй байна.');
      }
    });
  });
});
