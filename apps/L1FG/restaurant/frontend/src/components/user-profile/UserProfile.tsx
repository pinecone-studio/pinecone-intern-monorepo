'use client';
import { useEffect, useState } from 'react';
import Header from '../common/Header';
import { Edit2 } from 'lucide-react';
import Image from 'next/image';

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
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <Image src={user?.profileImage || '/default-avatar.png'} alt="Profile image" width={100} height={100} className="rounded-full" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm" aria-label="Edit avatar">
            <Edit2 />
          </button>
        </div>

        <div className="mt-4 w-full flex flex-col gap-5 text-left">
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Утас:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user?.phoneNumber}</p>
              <button aria-label="Edit phone number">
                <Edit2 color="#09090B" width={16} height={16} />
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Имэйл хаяг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user?.email}</p>
              <button aria-label="Edit email">
                <Edit2 color="#09090B" width={16} height={16} />
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-medium">Нууц үг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">*************</p>
              <button aria-label="Edit password">
                <Edit2 color="#09090B" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
