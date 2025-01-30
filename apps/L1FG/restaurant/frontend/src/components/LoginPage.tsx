'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      createdAt
      email
      profileImage
      _id
      userName
      phoneNumber
    }
  }
`;

const LoginPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    loading: false,
    errorMessage: '',
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSignIn = async () => {
    if (!formState.email || !formState.password) {
      setFormState({ ...formState, errorMessage: 'Бүх талбарыг бөглөнө үү.' });
      return;
    }

    try {
      const user = await loginUser({
        variables: {
          input: {
            email: formState.email,
            password: formState.password,
          },
        },
      });

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: user.data.loginUser._id,
          email: user.data.loginUser.email,
          userName: user.data.loginUser.userName,
          profileImage: user.data.loginUser.profileImage,
          phoneNumber: user.data.loginUser.phoneNumber,
          createdAt: user.data.loginUser.createdAt,
        })
      );

      setFormState({ ...formState, loading: !formState.loading });

      router.push('/order/1');
    } catch (error) {
      setFormState({
        ...formState,
        loading: false,
        errorMessage: 'Имэйл эсвэл нууц үг буруу байна.',
      });
    }
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
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="email"
            />
            <input
              data-testid="password"
              placeholder="Нууц үг"
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              className="w-full h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          <p className={`text-red-600 text-sm w-4/5 justify-center items-center px-2 mx-auto ${formState.errorMessage === '' ? 'hidden' : 'flex'}`}>{formState.errorMessage}</p>
          <button
            data-testid="Нэвтрэх"
            onClick={handleSignIn}
            className="flex w-full h-[36px] font-medium text-sm justify-center items-center rounded-md text-white bg-[#441500]"
            disabled={formState.loading}
          >
            {formState.loading ? 'Уншиж байна...' : 'Нэвтрэх'}
          </button>
          <Link href="reset-password">
            <button className="flex w-full h-[36px] font-medium text-sm justify-center items-center">Нууц үг мартсан?</button>
          </Link>
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
