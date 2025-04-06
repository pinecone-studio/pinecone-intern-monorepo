'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProviderSignIn';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-sm p-8 space-y-6 rounded-lg bg-zinc-800 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-white">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-300 text-sm">Dont have an account?</span>
            <Button
              variant="outline"
              className="text-sm border border-zinc-600 text-gray-100 bg-transparent hover:text-zinc-800 hover:bg-gray-200 transition"
              onClick={() => router.push('/sign-up')}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your password"
              className="mt-1 block w-full pr-10 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-0 flex items-center pr-3 text-xs text-gray-400 hover:text-gray-200"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div>
            <Button type="submit" className="w-full bg-black hover:text-zinc-800 hover:bg-gray-200 transition">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
