'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginUserMutation } from '@/generated';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useLoginUserMutation();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        variables: {
          input: { email, password },
        },
      });

      if (response.data?.loginUser) {
        const user = response.data.loginUser;

        if (user.role !== 'admin') {
          alert('Та админ эрхгүй байна.');
          return;
        }

        localStorage.setItem('token', user._id); // Store token (replace with real auth token)
        router.push('/admin/dashboard'); // Redirect after login
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex h-[100vh] justify-center mt-[30vh]">
      <div className="flex flex-col items-center w-[330px] gap-6">
        <div>
          <Image width={108} height={108} src="/Logo.png" alt="logo" />
        </div>
        <div className="text-[#1D1F24] text-2xl font-semibold " data-testid="nevtreh">
          Нэвтрэх
        </div>
        <div className="w-full flex flex-col gap-2">
          <Input placeholder="Имэйл хаяг" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Нууц үг" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
          </Button>
          {error && (
            <p className="text-red-500" data-testid="buruu">
              Нууц үг эсвэл Имэйл буруу
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
