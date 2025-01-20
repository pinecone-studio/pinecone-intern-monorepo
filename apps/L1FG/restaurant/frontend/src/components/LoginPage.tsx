'use client';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error('Бүх талбарыг бөглөнө үү.');
      return;
    }
    setLoading(true);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center mx-auto px-4">
      <div className="w-full flex flex-col items-center justify-between gap-6">
        <Image src="/Logo.png" alt="Logo" width={112} height={112} />
        <div className="flex gap-2 items-center justify-center flex-col">
          <p className="font-semibold text-2xl">Нэвтрэх</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[340px] min-w-[320px]">
          <div className="flex flex-col gap-2">
            <input
              data-testid="email"
              placeholder="Имэйл хаяг"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="email"
            />
            <input
              data-testid="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          <button data-testid="Нэвтрэх" onClick={handleSignIn} className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500]" disabled={loading}>
            {loading ? 'Уншиж байна...' : 'Нэвтрэх'}
          </button>
          <div className="flex w-full h-[36px] font-medium text-sm justify-center items-center">Нууц үг мартсан?</div>
          <div className="flex justify-between items-center gap-4">
            <div className="w-full h-[1px] border-[1px] border-[#E4E4E7]"></div>
            <div className="text-xs text-[#71717A]">Эсвэл </div>
            <div className="w-full h-[1px] border-[1px] border-[#E4E4E7]"></div>
          </div>
          <Link href="register" className="font-medium text-sm w-full text-center h-[36px] rounded-md px-3 py-2 border-[1px] border-[#E4E4E7] text-black">
            Бүртгүүлэх
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
