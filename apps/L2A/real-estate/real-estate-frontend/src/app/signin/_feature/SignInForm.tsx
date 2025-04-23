'use client';

import { useState } from 'react';
import Link from 'next/link';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email: string) => {
    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both email and password');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Invalid email format');
      return;
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div
          id="form-error"
          data-testid="form-error"
          className="text-red-500 text-sm border border-red-200 p-2 rounded"
        >
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 flex justify-between">
          <span>Password</span>
          <Link href="#" className="text-blue-500 text-sm">Forget password?</Link>
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
      >
        Continue
      </button>
    </form>
  );
};

export default SignInForm;


