'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Error in email';
    if (!password.trim()) newErrors.password = 'Error in password';
    setErrors(newErrors);
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex flex-col items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-1">
          <Link href={'/'}>
            <Image src="/tinder.svg" alt="" width={1000} height={1000} className="h-[100px] w-[100px] text-[#fe3c72]" />
          </Link>
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">Enter your email below to sign in</p>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2 flex flex-col">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <Link href="/" className="text-sm text-blue-500 hover:underline">
                Forget password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-[#fe3c72] hover:bg-[#e5355e] text-white rounded-full">
            Continue
          </Button>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-[1px] bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-[1px] bg-gray-200 flex-1"></div>
          </div>

          <Button variant="outline" className="w-full border border-gray-300 rounded-full hover:bg-gray-50">
            Create an account
          </Button>

          <div className="text-center text-xs text-gray-500 mt-6">
            <p>
              By clicking continue, you agree to our{' '}
              <Link href="/" className="underline">
                Terms of Service
              </Link>
              and
              <Link href="/" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </form>
      <div className="text-xs text-gray-400 mt-8">©2024 Tinder</div>
    </div>
  );
};
export default SignInPage;
