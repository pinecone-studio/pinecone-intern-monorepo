'use client';

import React, { useState } from 'react';
import { useAuth } from '../providers/Auth.Provider';

export const SignInForm = () => {
  const { signin } = useAuth();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signin({
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50" data-cy="SignIn-Page">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <span className="text-blue-500 font-bold text-xl">P</span>
          </div>
          <h1 className="text-2xl font-bold mt-4">Sign in</h1>
          <p className="text-gray-500 mt-1 text-sm">Enter your email below to sign in</p>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleChange}
              data-testid="email-input"
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-blue-500 hover:underline">
                Forget password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleChange}
              data-testid="password-input"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            data-testid="continue-btn"
          >
            Continue
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="border-t border-gray-300 w-full" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="border-t border-gray-300 w-full" />
        </div>
        <button className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
          Create an account
        </button>
        {error && (
          <p className="text-sm text-red-500" data-testid="ErrorSignIn">
            {error}
          </p>
        )}
        <p className="mt-6 text-xs text-gray-500 text-center">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
