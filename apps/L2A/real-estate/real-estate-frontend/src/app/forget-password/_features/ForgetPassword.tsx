'use client';

import { useState, useCallback } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError('');
      if (!email) {
        setError('Email is required');
        return;
      }
      setSubmitted(true);
    },
    [email]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-md p-8 rounded-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl font-bold text-orange-600 mb-2">🏠</div>
          <h1 className="text-xl font-semibold">Home Vault</h1>
        </div>
        <h2 className="text-lg font-medium mb-1 text-center">Forget password</h2>
        <p className="text-gray-500 text-sm text-center mb-4">Enter your email account to reset password</p>

        {submitted ? (
          <p className="text-green-600 text-sm text-center mb-4">A reset link has been sent to your email.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button type="submit" data-testid="submit-button" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition">
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
