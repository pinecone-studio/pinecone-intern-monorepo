'use client';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useAuth } from './context/AuthContext';
import Link from 'next/link';

const Header = () => {
  const { user } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 py-4 text-white bg-black" role="navigation" aria-label="Main Navigation" data-testid="header">
      <div className="flex items-center gap-2 text-lg font-bold text-white">
        <span className="inline-block w-4 h-4 rounded-full bg-sky-400" aria-hidden="true"></span>
        <Link href={'/'}>TICKET BOOKING</Link>
      </div>
      <div className="flex-1 max-w-xl mx-6">
        <div className="flex items-center px-4 py-2 bg-black border border-gray-700 rounded-md">
          <input type="text" placeholder="Хайлт" className="flex-1 text-white placeholder-gray-400 bg-transparent outline-none" aria-label="Search" />
          <FaSearch className="text-white" aria-hidden="true" />
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <div>{user.email}</div>
          <button
            onClick={() => {
              localStorage.clear();
            }}
            className="px-4 py-2 font-medium text-black rounded-md bg-sky-400 hover:bg-sky-500"
          >
            Гарах
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <FaShoppingCart className="text-xl text-white" aria-label="Shopping Cart" />
          <Link href={'/auth/signup'}>
            <button className="px-4 py-2 text-white border border-gray-700 rounded-md">Бүртгүүлэх</button>
          </Link>
          <Link href={'/auth/signin'}>
            <button className="px-4 py-2 font-medium text-black rounded-md bg-sky-400 hover:bg-sky-500">Нэвтрэх</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
