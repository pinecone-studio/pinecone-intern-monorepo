'use client';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ variables: { email, password } });
      Cookies.set('token', data.loginUser.token, { expires: 2, secure: true });
      router.push('/');
    } catch (err) {
      setError('Login failed');
    }
  };
  return (
    <form data-cyid="form" onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          data-testid="email-Input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="name@example.com"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Link href={'/forget-password'} className="text-blue-600 flex justify-between mb-2 cursor-pointer underline">
            Forget Password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="••••••••"
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm" data-cy="error message">
          {error}
        </p>
      )}
      <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600" disabled={loading} data-testid="submit-button">
        {loading ? 'Logging in...' : 'Continue'}
      </button>
    </form>
  );
};
export default SignInForm;
