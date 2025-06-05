'use client';

import { FaSearch } from 'react-icons/fa';
import { useAuth } from './context/AuthContext';
import Link from 'next/link';
import { CartIconWithModal } from './CartIconWithModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [name, setName] = useState('');

  const handleSearch = () => {
    if (name.trim()) {
      router.push(`/search?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex flex-col md:flex-row items-center justify-around gap-4" role="navigation" aria-label="Main Navigation" data-testid="header">
      <div className="flex items-center gap-2 text-lg font-bold">
        <span className="w-4 h-4 rounded-full bg-sky-400" />
        <Link href="/" className="hover:underline">
          TICKET BOOKING
        </Link>
      </div>
      <div className="flex-1 max-w-lg w-full">
        <div className="flex items-center px-4 py-2 border border-gray-700 rounded-md bg-black">
          <input
            type="text"
            placeholder="Хайлт"
            aria-label="Search"
            data-testid="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <button onClick={handleSearch} aria-label="Search">
            <FaSearch className="text-white hover:text-sky-400" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CartIconWithModal />
        {user ? (
          <div className="flex items-center gap-4">
            <Link href={`/profile`} data-testid="profile-settings-button" className="text-sm hover:underline">
              {user.email}
            </Link>
            <button onClick={logout} data-testid="logout-button" className="px-4 py-2 font-medium text-black bg-sky-400 hover:bg-sky-500 rounded-md">
              Гарах
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/signup">
              <button className="px-4 py-2 border border-gray-700 rounded-md text-sm">Бүртгүүлэх</button>
            </Link>
            <Link href="/auth/signin">
              <button className="px-4 py-2 font-medium text-black bg-sky-400 hover:bg-sky-500 rounded-md text-sm">Нэвтрэх</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
