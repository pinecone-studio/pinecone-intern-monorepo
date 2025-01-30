'use client';
import { Pencil } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Bell } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <div className="max-h-[500px] bg-white text-center flex flex-col items-center p-4">
      <header className="w-full flex items-center justify-between mb-6">
        <div className="relativ">
          <Image src="/Logo.png" alt="" fill className=" object-contain" />
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <span className="material-icons">
              <ShoppingCart />
            </span>
          </button>
          <button>
            <span className="material-icons">
              <Bell />
            </span>
          </button>
          <button>
            <span className="material-icons">
              <AlignJustify />
            </span>
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center bg-gray-100 min-h-[679px] rounded-xl shadow-md p-6 w-full max-w-sm">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <Image src={user?.profileImage || '/default-avatar.png'} alt="Profile image" width={100} height={100} className="rounded-full" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm" aria-label="Edit avatar">
            <span className="material-icons text-gray-500">
              <Pencil />
            </span>

          </button>
        </div>

        <div className="mt-4 w-full flex flex-col gap-5 text-left">
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Утас:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.phone}</p>
              <button className="ml-2 text-gray-500 hover:text-gray-700" aria-label="Edit phone number">
                <span className="material-icons">
                  <Pencil />
                </span>
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col mb-4">
            <p className="text-gray-700 font-medium">Имэйл хаяг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.gmail}</p>
              <button className="ml-2 text-gray-500 hover:text-gray-700" aria-label="Edit email">
                <span className="material-icons">
                  <Pencil />
                </span>
              </button>
            </div>
          </div>

          <div className="w-full border border-gray-300 "></div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-medium">Нууц үг:</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-900">{user.password}</p>
              <button className="ml-2 text-gray-500 hover:text-gray-700" aria-label="Edit password">
                <span className="material-icons">
                  <Pencil />
                </span>

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
