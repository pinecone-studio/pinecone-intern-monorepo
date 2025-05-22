'use client';
import { PasswordStepOneProps } from '../page';
import { useState } from 'react';

export const PasswordStepOne = ({ setStep, setEmail }: PasswordStepOneProps) => {
  const [email, setEmailLocal] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLocal(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setEmail(email);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-2xl text-center font-bold">Forget password</p>
      <div className="text-gray-600 text-center">Enter your email account to reset password</div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="email@example.com"
          aria-label="Email address"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button type="submit" data-testid="submit-button" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition">
        Continue
      </button>
    </form>
  );
};
