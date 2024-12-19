import { useState } from 'react';

import { useCreateUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

interface AddpasswordProps {
  formData: {
    email: string;
  };
}

const Addpassword: React.FC<AddpasswordProps> = ({ formData }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const [createUser] = useCreateUserMutation();
  const handleSubmit = async () => {
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    try {
      await createUser({
        variables: {
          input: {
            email: formData.email,
            password,
          },
        },
      });
      router.push('/');
    } catch (error) {
      setError('.as');

      console.error('Error creating user:', error);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-screen max-h-[1000px] justify-center">
      <div className="w-[350px] flex flex-col gap-8 items-center justify-between h-[340px]">
        <img className="w-[100px] h-[24px]" src="redlogo.png" alt="Logo" />
        <div className="flex gap-2 h-[92px] w-[350px] items-center flex-col">
          <div className="font-semibold text-2xl">Create password</div>
          <div className="font-normal text-center text-sm text-[#71717A]">Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers.</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="font-medium text-sm">
              Confirm password
            </label>
            <input
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Password repeat"
              className="w-[350px] h-[36px] px-3 py-2 border-[1px] border-[#E4E4E7] rounded-[6px]"
              type="password"
            />
          </div>
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          <button data-testid="continue-btn" className="flex w-[350px] h-[36px] font-medium text-sm justify-center items-center rounded-full text-white bg-[#E11D48]" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addpassword;
