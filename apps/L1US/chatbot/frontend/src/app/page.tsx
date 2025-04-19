'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
      <div>
        <h1>HomePage</h1>
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div>
            <p>Please log in or sign up</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
              <Button onClick={() => router.push('/sign-up')}>Sign Up</Button>
              <Button onClick={() => router.push('/chat')}>Chat Session</Button>
            </div>
          </div>
        )}
      </div>
  );
};

export default HomePage;
