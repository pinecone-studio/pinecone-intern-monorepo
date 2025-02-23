'use client';
import { useEffect, useState } from 'react';
import Header from '../common/Header';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import UpdateNumber from '../update-user-dialogs/UpdateNumber';
import UpdateEmail from '../update-user-dialogs/UpdateEmail';
import UpdatePassword from '../update-user-dialogs/UpdatePassword';
import UpdateImage from '../update-user-dialogs/UpdateImage';

const UserProfile = () => {
  interface User {
    profileImage: string;
    phoneNumber: string;
    email: string;
  }

  const [user, setData] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    setData(userData);
  }, []);

  return (
    <div className="w-full bg-white text-center flex flex-col items-center">
      <Header />

      <div className="flex flex-col items-center p-6 w-full max-w-sm pt-20">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#F4F4F5] flex items-center justify-center">
            {user?.profileImage ? (
              <Image src={user.profileImage} alt="Profile image" width={100} height={100} className="rounded-full bg-white" data-testid="profileImage" />
            ) : (
              <User2 width={40} height={44} color="#441500" data-testid="defaultUser" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full w-10 h-10 justify-center items-center flex border" aria-label="Edit avatar">
            <UpdateImage />
          </button>
        </div>

        <div className="mt-4 w-full flex flex-col gap-5 text-left">
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Утас:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user?.phoneNumber}</p>
              <button aria-label="Edit phone number">
                <UpdateNumber />
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Имэйл хаяг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user?.email}</p>
              <button aria-label="Edit email">
                <UpdateEmail />
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-medium">Нууц үг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">*************</p>
              <button aria-label="Edit password">
                <UpdatePassword />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
