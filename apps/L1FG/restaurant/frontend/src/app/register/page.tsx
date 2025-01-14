'use client';

import { useState } from 'react';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [created, setCreated] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value);
  };

  const validateFields = (userName: string, email: string, password: string, rePassword: string) => {
    if (!userName || !email || !password || !rePassword) {
      return 'Бүх талбарыг бөглөнө үү.';
    }
    return null;
  };

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Имэйл хаяг буруу байна.';
    }
    return null;
  };

  const validatePasswords = (password: string, rePassword: string) => {
    if (password !== rePassword) {
      return 'Нууц үг давтахад алдаа гарлаа.';
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Нууц үг хамгийн багадаа 8 тэмдэгт байж, үсэг, тоо агуулсан байх ёстой.';
    }

    return null;
  };

  const signUpClick = () => {
    setError(null);
    setIsSubmitting(true);

    let error = validateFields(userName, email, password, rePassword);
    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }

    error = validateEmailFormat(email);
    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }

    error = validatePasswords(password, rePassword);
    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Sign-up successful:', { userName, email, password });
      setCreated(true);
    } catch (error) {
      setError('Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className={`flex flex-col mx-6 max-w-screen justify-center items-center gap-2 h-screen ${created ? 'hidden' : 'flex'}`}>
        <p className="text-[#441500] font-semibold text-2xl mb-4">Бүртгүүлэх</p>
        <input placeholder="Хэрэглэгчийн нэр" className="border rounded-md px-3 py-1 w-full" onChange={handleName}></input>
        <input placeholder="Имэйл хаяг" className="border rounded-md px-3 py-1 w-full" onChange={handleEmail}></input>
        <input placeholder="Нууц үг" className="border rounded-md px-3 py-1 w-full" onChange={handlePassword}></input>
        <input placeholder="Нууц үг давтах" className="border rounded-md px-3 py-1 w-full" onChange={handleRePassword}></input>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}

        <div className="flex flex-col gap-6 w-full">
          <button className="bg-[#441500] text-white rounded-md px-4 py-2" onClick={signUpClick} disabled={isSubmitting}>
            {isSubmitting ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
          </button>
          <div className="flex justify-center items-center gap-2">
            <div className="border-b h-1 w-full"></div>
            <p>Эсвэл</p>
            <div className="border-b h-1 w-full"></div>
          </div>
          <button className="rounded-md px-4 py-2 text=[#441500] border">Нэвтрэх</button>
        </div>
      </div>
      <div className={` flex-col mx-6 max-w-screen justify-center items-center gap-4 h-screen ${created ? 'flex' : 'hidden'}`}>
        <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="100" height="100" rx="50" fill="#F4F4F5" fillOpacity="0.9" />
          <path d="M29.3892 54.6974L46.0814 68.0017L72.9844 34.2455" stroke="#441500" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="text-[#441500] font-semibold text-lg">Амжилттай үүсгэлээ.</p>
      </div>
    </div>
  );
};
export default Register;
