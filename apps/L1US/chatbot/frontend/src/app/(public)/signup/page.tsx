'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({
      email,
      username,
      password,
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md p-10 space-y-10 rounded-md bg-zinc-800">
        <h2 className="text-center text-3xl text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </Label>
            <Input id="email" name="email" type="email" required placeholder="Enter your email" className="mt-1 block w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </Label>
            <Input id="username" name="username" type="text" required placeholder="Enter your username" className="mt-1 block w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
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
              className="mt-1 block w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute top-1/2 right-0 pr-3 flex items-center text-sm">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div>
            <Button type="submit" className="w-full bg-black">
              Sign Up
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-300 text-sm">Already have an account?</span>
            <Button
              variant="outline"
              className="text-sm border-0 text-gray-100 bg-transparent hover:text-zinc-800 hover:bg-gray-200"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
