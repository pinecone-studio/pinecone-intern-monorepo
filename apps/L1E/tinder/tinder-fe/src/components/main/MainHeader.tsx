'use client';
import Link from 'next/link';
import { Flame, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const MainHeader = ({ user }: any) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const userImage = user?.images?.[0] || 'redlogo.png'; // Set a fallback image if not available

  return (
    <div className="absolute w-screen flex flex-col  z-50 justify-center items-center pt-4 bg-transparent">
      <div className="max-w-[1180px] w-screen flex justify-between">
        <Link href="main">
          <img data-testid="profile-image" src="redlogo.png" className="w-[100px] cursor-pointer h-[24px]" alt="" />
        </Link>
        <div className="flex w-[180px] relative justify-between items-center">
          <Link href="/premium">
            <Flame className="w-4 text-red-500 h-4" />
          </Link>
          <Link href="/chat" className="flex text-red-500 items-center">
            <MessageSquare className="w-4 h-4" />
          </Link>

          <div role="button" aria-expanded={dropdownOpen} aria-haspopup="true" data-testid="drop" onClick={toggleDropdown}>
            <img src={userImage} className="w-8 h-8 rounded-full" alt="Profile" />
          </div>
          {dropdownOpen && (
            <div role="menu" className="absolute top-8 right-[-20px] bg-white border border-gray-300 rounded-md shadow-lg mt-2">
              <Link href="/profile">
                <div role="menuitem" className="p-2 hover:bg-gray-100">
                  Profile
                </div>
              </Link>
              <div role="menuitem" data-testid="logout" className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-[1px] mt-4 z-0 border-[#e4e4e7] w-full"></div>
    </div>
  );
};
