'use client';
import { useState } from 'react';
import { PasswordStepThreeProps } from '../page';
import { useResetPasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';

export const PasswordStepThree = ({ email, testLoading }: PasswordStepThreeProps & { testLoading?: boolean }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [resetPassword, { loading }] = useResetPasswordMutation();
  const isLoading = typeof testLoading === 'boolean' ? testLoading : loading;

  const validatePassword = (): boolean => {
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleToken = (token?: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.removeItem('email');
      router.push('/');
      router.refresh();
      setSuccess(true);
    } else {
      localStorage.setItem('token', '');
      setError('Failed to reset password. Try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      const result = await resetPassword({
        variables: { email, password },
      });

      const token = result?.data?.resetPassword?.token;
      handleToken(token);
    } catch {
      setError('Failed to reset password. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xl font-bold text-center">Create new password</p>

      <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="new-password" className="w-full px-4 py-2 border rounded-md" />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        data-testid="confirm-password"
        className="w-full px-4 py-2 border rounded-md"
      />

      {error && (
        <p data-testid="reset-error" className="text-red-500">
          {error}
        </p>
      )}

      {success && <p className="text-green-500">Password reset successfully!</p>}

      <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md" disabled={isLoading} data-testid="reset-submit">
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};
