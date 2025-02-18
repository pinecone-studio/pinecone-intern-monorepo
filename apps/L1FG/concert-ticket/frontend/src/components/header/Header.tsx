import Link from 'next/link';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const HeaderPart = () => {
  const { user, logout } = useAuth();
  const [userID, setUserID] = useState();
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem('user');
    if (!userId) return;

    const parsedUser = JSON.parse(userId);

    const userID = parsedUser?._id;
    setUserID(userID);
  }, []);
  return (
    <div className="h-[96px] bg-black flex justify-between items-center py-[24px] px-12">
      <div className="flex items-center gap-[8px]">
        <div className="w-[20px] h-[20px] bg-[#00B7F4] rounded-full"></div>
        <Link href={'/'}>
          <h1 className="text-white text-[24px] font-bold">TICKET BOOKING</h1>
        </Link>
      </div>

      <div className="flex items-center gap-[16px]">
        <Link href={'/search'}>
          <button className="p-[8px] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
          </button>
        </Link>

        {user ? (
          <>
            <div data-testid="header-order-page" onClick={() => router.push(`/order/${userID}`)} className="text-white font-medium">
              {user.email}
            </div>
            <button data-testid="header-logout-button" onClick={logout} className="text-white bg-red-600 px-[16px] py-[8px] rounded-lg hover:bg-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <button data-testid="sign-up" onClick={() => router.push('/signup')} className="text-white border border-gray-600 px-[16px] py-[8px] rounded-lg hover:border-white">
              Бүртгүүлэх
            </button>
            <button data-testid="sign-in" onClick={() => router.push('/signin')} className="text-black bg-[#00B7F4] px-[16px] py-[8px] rounded-lg hover:bg-[#009fd1]">
              Нэвтрэх
            </button>
          </>
        )}
      </div>
    </div>
  );
};
