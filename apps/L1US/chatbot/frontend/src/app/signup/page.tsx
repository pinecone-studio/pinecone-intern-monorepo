import React from 'react';
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="w-full max-w-md p-10 space-y-10 rounded-md shadow-xl">
        <h2 className="text-center text-3xl font-bold text-foreground">Sign Up</h2>
        <form className="mt-8 space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
