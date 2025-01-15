'use client';

import Image from 'next/image';
import { SetStateAction, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Имэйл болон Нууц үг заавал оруулна уу.');
      return;
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="flex flex-col mx-6 max-w-screen justify-center items-center gap-6 h-screen">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Image alt="image" width={112} height={112} className="w-28 h-28" src="/Logo.png" />
        <p className="text-[#441500] text-2xl font-semibold">Нэвтрэх</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input className="border rounded-md px-3 py-1 w-full" placeholder="Имэйл хаяг" type="email" value={email} onChange={handleEmail} aria-label="Имэйл хаяг" />
        <input className="border rounded-md px-3 py-1 w-full" placeholder="Нууц үг" type="password" value={password} onChange={handlePassword} aria-label="Нууц үг" />
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
        <button className="bg-[#441500] text-white rounded-md px-4 py-2 w-full" onClick={handleLogin}>
          Нэвтрэх
        </button>

        <h2 className="flex justify-center">Нууц үг мартсан?</h2>
      </div>
      <div className="flex justify-center w-full items-center gap-2">
        <div className="border-b h-1 w-full"></div>
        <p className="font-light text-gray-500">Эсвэл</p>
        <div className="border-b h-1 w-full"></div>
      </div>
      <button className="rounded-md px-4 py-2 text-[#441500] border w-full">Бүртгүүлэх</button>
    </div>
  );
};

export default Login;
