'use client';

import React, { useState } from 'react';
import { useAuth } from '../providers/Auth.Provider';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const SignInForm = () => {
  const { signin, signInLoading } = useAuth();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

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
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div data-testid="sign-up-form" className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-[350px] mx-auto bg-white   rounded-md border-none shadow-none">
        <CardHeader className="text-center flex-row justify-center items-center gap-2">
          <div className="w-5 h-5 bg-[#2563EB] rounded-full"></div>
          <h4 className="text-2xl font-light font-sans text-end pb-2">Pedia</h4>
        </CardHeader>
        <CardContent>
          <div className="w-full h-full ">
            <form onSubmit={handleSignIn} className="space-y-8 " data-testid="NextButton">
              <div>
                <h2 className="text-2xl font-semibold text-center">Sign In</h2>
                <p className="text-sm font-normal text-gray-500 text-center">Enter your email below to sign in</p>
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm text-[#09090B] pb-2">Email</h3>
                  <Input className="h-9" id="email" type="email" placeholder="name@example.com" data-testid="email-input" onChange={handleChange} />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm text-[#09090B] pb-2">Password</h3>
                    <Link href={'/forgetpassword'}>
                      <h3 className="text-sm text-[#2563EB] pb-2">Forget Password?</h3>{' '}
                    </Link>
                  </div>
                  <Input className="h-9" id="password" type="password" placeholder="password" data-testid="password-input" onChange={handleChange} />
                </div>
                <Button type="submit" data-testid="continue-btn" disabled={signInLoading} className="w-full bg-blue-600 text-white py-2 rounded-md">
                  {signInLoading ? 'Continue...' : 'Continue'}
                </Button>
                <div className="w-full h-9 flex justify-between items-center">
                  <div className="w-5/12 h-[1px] flex items-center bg-[#E4E4E7] "></div>
                  <div>
                    <h5 className="text-xs text-[#71717A]">OR</h5>
                  </div>
                  <div className="w-5/12 h-[1px] flex items-center bg-[#E4E4E7] "></div>
                </div>
                <Link href={'/signup'}>
                  <Button type="submit" className="w-full bg-white text-sm  text-[#18181B] py-2 rounded-md font-medium border hover:bg-gray-400">
                    Create an account
                  </Button>
                </Link>
                <div className="px-8 pt-4">
                  <p className="text-sm text-[#71717A]">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
