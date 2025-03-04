'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/generated';
import { toast } from 'sonner';

interface User {
  userName: string;
  email: string;
  password: string;
  rePassword: string;
  loading: boolean;
  errorMessage: string;
}

const RegisterPage = () => {
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const [formState, setFormState] = useState<User>({
    userName: '',
    email: '',
    password: '',
    rePassword: '',
    loading: false,
    errorMessage: '',
  });

  const handleRegister = async () => {
    if ([formState.email, formState.password, formState.userName, formState.rePassword].some((field) => !field)) {
      return setFormState({ ...formState, errorMessage: 'Бүх талбарыг бөглөнө үү.' });
    }
    if (formState.password !== formState.rePassword) {
      return setFormState({ ...formState, errorMessage: 'Нууц үг таарахгүй байна.' });
    }
    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      return setFormState({ ...formState, errorMessage: 'Зөв имэйл хаяг оруулна уу.' });
    }

    try {
      setFormState({ ...formState, loading: !formState.loading });

      await createUser({
        variables: {
          input: {
            email: formState.email,
            userName: formState.userName,
            password: formState.password,
            rePassword: formState.rePassword,
          },
        },
      });
      toast.success('Шинэ хэрэглэгчйин бүртгэл үүслээ');
      router.push('/login');
    } catch (error) {
      setFormState({
        ...formState,
        loading: false,
        errorMessage: 'Бүртгэл амжилтгүй боллоо.',
      });
      toast.error('Бүртгэл амжилтгүй боллоо.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center mx-auto px-4">
      <div className="w-full flex flex-col items-center justify-between gap-6">
        <p className="font-semibold text-2xl text-[#441500]">Бүртгүүлэх</p>
        <div className="flex flex-col gap-4 max-w-[340px] min-w-[320px]">
          <form className="flex flex-col gap-2">
            <input
              data-testid="userName"
              placeholder="Хэрэглэгчийн нэр"
              value={formState.userName}
              onChange={(e) => setFormState({ ...formState, userName: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="text"
              autoComplete="username"
            />
            <input
              data-testid="email"
              placeholder="Имэйл хаяг"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="email"
              autoComplete="username"
            />
            <input
              data-testid="password"
              placeholder="Нууц үг"
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
              autoComplete="new-password"
            />

            <input
              data-testid="rePassword"
              placeholder="Нууц үг давтах"
              value={formState.rePassword}
              onChange={(e) => setFormState({ ...formState, rePassword: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
              autoComplete="new-password"
            />
          </form>
          <p className={`text-red-600 text-sm w-4/5 justify-center items-center px-2 mx-auto ${formState.errorMessage === '' ? 'hidden' : 'flex'}`}>{formState.errorMessage}</p>
          <button
            data-testid="Бүртгүүлэх"
            className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500]"
            onClick={handleRegister}
            disabled={formState.loading}
          >
            {formState.loading ? 'Уншиж байна...' : 'Бүртгүүлэх'}
          </button>
          <div className="flex justify-between items-center gap-4">
            <div className="w-full h-[1px] border-[1px] border-[#E4E4E7]"></div>
            <div className="text-xs text-[#71717A]">Эсвэл </div>
            <div className="w-full h-[1px] border-[1px] border-[#E4E4E7]"></div>
          </div>
          <Link href="login" className="font-medium text-sm w-full text-center h-[36px] rounded-md px-3 py-2 border-[1px] border-[#E4E4E7] text-black">
            Нэвтрэх
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
