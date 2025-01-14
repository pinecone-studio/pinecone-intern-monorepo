'use client';

import { useState } from 'react';

const Register = () => {
  const [formState, setFormState] = useState({
    userName: '',
    email: '',
    password: '',
    rePassword: '',
    error: null as string | null,
    isSubmitting: false,
    created: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
    setFormState((prevState) => ({ ...prevState, error: null, isSubmitting: true }));

    const { userName, email, password, rePassword } = formState;

    let error = validateFields(userName, email, password, rePassword);
    if (error) {
      setFormState((prevState) => ({ ...prevState, error, isSubmitting: false }));
      return;
    }

    error = validateEmailFormat(email);
    if (error) {
      setFormState((prevState) => ({ ...prevState, error, isSubmitting: false }));
      return;
    }

    error = validatePasswords(password, rePassword);
    if (error) {
      setFormState((prevState) => ({ ...prevState, error, isSubmitting: false }));
      return;
    }
    try {
      setFormState((prevState) => ({ ...prevState, created: true }));
    } catch (error) {
      setFormState((prevState) => ({ ...prevState, error: 'Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.', isSubmitting: false }));
    } finally {
      setFormState((prevState) => ({ ...prevState, isSubmitting: false }));
    }
  };

  return (
    <div>
      <div className={`flex flex-col mx-6 max-w-screen justify-center items-center gap-2 h-screen ${formState.created ? 'hidden' : 'flex'}`}>
        <p className="text-[#441500] font-semibold text-2xl mb-4">Бүртгүүлэх</p>
        <input name="userName" placeholder="Хэрэглэгчийн нэр" className="border rounded-md px-3 py-1 w-full" onChange={handleChange} />
        <input name="email" placeholder="Имэйл хаяг" className="border rounded-md px-3 py-1 w-full" onChange={handleChange} />
        <input name="password" type="password" placeholder="Нууц үг" className="border rounded-md px-3 py-1 w-full" onChange={handleChange} />
        <input name="rePassword" type="password" placeholder="Нууц үг давтах" className="border rounded-md px-3 py-1 w-full" onChange={handleChange} />
        {formState.error && <div className="text-red-500 text-xs mt-2">{formState.error}</div>}

        <div className="flex flex-col gap-6 w-full">
          <button className="bg-[#441500] text-white rounded-md px-4 py-2" onClick={signUpClick} disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
          </button>
          <div className="flex justify-center items-center gap-2">
            <div className="border-b h-1 w-full"></div>
            <p>Эсвэл</p>
            <div className="border-b h-1 w-full"></div>
          </div>
          <button className="rounded-md px-4 py-2 text=[#441500] border">Нэвтрэх</button>
        </div>
      </div>
      <div className={`flex-col mx-6 max-w-screen justify-center items-center gap-4 h-screen ${formState.created ? 'flex' : 'hidden'}`}>
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
