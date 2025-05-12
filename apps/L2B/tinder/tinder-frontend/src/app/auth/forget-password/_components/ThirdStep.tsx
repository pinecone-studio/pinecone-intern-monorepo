'use client';
import React, { useState } from 'react';

interface Errors {
  password?: string;
  confirmPassword?: string;
}

const ThirdStep = ({ email }: { email: string }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 10) {
      newErrors.password = 'Password must be at least 10 characters long.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Password successfully set!');
    }
  };
  return (
    <div className="w-full max-w-sm p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-black">Set new password</h2>
        <p className="text-sm text-gray-500">
          Use a minimum of 10 characters, including <br />
          uppercase letters, lowercase letters, and numbers
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? 'focus:ring-red-500' : 'focus:ring-pink-500'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p data-testid="password-error" className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-pink-500'
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p data-testid="confirm-password-error" className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button type="submit" className="w-full py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition">
          Continue
        </button>
      </form>
    </div>
  );
};
export default ThirdStep;
