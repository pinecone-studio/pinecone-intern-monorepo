'use client';
import { useState } from 'react';
import { useCreateUserMutation } from '@/generated';
import { StepOneProps } from '../page';

export const StepOne = ({ setStep, setEmail:setParentEmail }: StepOneProps) => {
  const [createUser, { loading }] = useCreateUserMutation();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      const { data } = await createUser({ variables: { email } });
      if (data?.createUser?.email) {
        localStorage.setItem('email', email);
        setParentEmail(email);
        setStep(2);
      }
    } catch (err) {
      console.error('sign up error', err);
      setError('Create new email failed');
    }
  };
  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-5"
      data-testid="step-one-form" 
      data-cy="step-one-form"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          data-cy="email-input"
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="name@example.com"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm" data-cy="error-message" data-testid="error-message">
          {error}
        </p>
      )}

      <button
        data-cy="submit-button"
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Continue'}
      </button>
    </form>
  );
};