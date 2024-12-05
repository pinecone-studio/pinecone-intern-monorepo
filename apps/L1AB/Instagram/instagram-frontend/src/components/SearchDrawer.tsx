'use client ';

import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetUserBySearchQuery } from '@/generated';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const variants = {
  close: { x: -491, opacity: 0, transition: { type: 'spring', damping: 15, duration: 0.5 } },
  open: { x: 0, opacity: 1, transition: { type: 'spring', damping: 15, duration: 0.5 } },
};

interface SearchProps {
  isOpen: boolean;
  toggleSearchDrawer: () => void;
  visitedUsers: Record<string, string>[];
  visitedUsersHandler: (_user: Record<string, string>[]) => void;
}
export const SearchDrawer = ({ isOpen }: SearchProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchVisited, setSearchVisited] = useState<any[]>([]);

  const { data } = useGetUserBySearchQuery({
    skip: !searchInput,
    variables: { searchInput },
  });

  const userData = data?.getUserBySearch;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('visitedUsers') || '[]');
    setSearchVisited(storedUsers);
  }, []);

  const saveVisitedUser = (user: any) => {
    const storedUsers = JSON.parse(localStorage.getItem('visitedUsers') || '[]');
    const updatedUsers = [...storedUsers, user];
    const uniqueUsers = Array.from(new Set(updatedUsers.map((u: any) => u._id))).map((id) => updatedUsers.find((u: any) => u._id === id));

    localStorage.setItem('visitedUsers', JSON.stringify(uniqueUsers));
    setSearchVisited(uniqueUsers);
  };

  const clearSearchVisited = (userId: string) => {
    const updatedVisited = searchVisited.filter((user) => user._id !== userId);
    setSearchVisited(updatedVisited);
    localStorage.setItem('visitedUsers', JSON.stringify(updatedVisited));
  };

  const clearAllVisitedHistory = () => {
    localStorage.removeItem('visitedUsers');
    setSearchVisited([]);
  };
  return (
    <>
      <motion.nav
        data-testid="search-drawer"
        variants={variants}
        initial="close"
        animate={isOpen ? 'open' : 'close'}
        exit="close"
        transition={{ type: 'spring', damping: 15, duration: 0.5 }}
        className={`drawer fixed space-y-5 w-[411px] border border-gray-100  h-full left-[80px] rounded-r-2xl divide-y divide-slate-200 transition-transform duration-100 shadow shadow-neutral-600 ${
          isOpen ? 'translate-x-[-411px]' : 'translate-x-0'
        }`}
      >
        <div className="space-y-5 py-6 px-4">
          <h1 className="font-semibold text-2xl">Search</h1>
          <div className="relative  w-full  bg-gray-100 rounded-lg h-10 flex px-4 py-1 items-center text-gray-500 gap-4">
            <Search size={16} />
            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." className="bg-transparent w-full h-full outline-none font-light "></input>
            {searchInput && (
              <button onClick={() => setSearchInput('')} className="absolute right-4 font-xs  bg-gray-300 text-white rounded-full transition-colors">
                <X size={10} className="m-0.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <div className=" space-y-4 px-6 py-4 ">
            <div className="flex justify-between">
              <span className="font-medium">Recent</span>
              <span onClick={clearAllVisitedHistory} className="text-blue-500 text-sm cursor-pointer">
                Clear all
              </span>
            </div>
          </div>

          {!searchInput
            ? searchVisited.map((user, i) => (
                <div key={i} className="h-[58px] w-full bg-white flex items-center justify-between px-6 hover:bg-gray-100">
                  <div className="flex gap-3">
                    <div className="relative w-[44px] h-[44px] rounded-full overflow-hidden">
                      <Image
                        fill
                        src={user.profilePicture && user.profilePicture.startsWith('http') ? user.profilePicture : '/default-profile.jpg'}
                        alt="Profile picture"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-gray-500">{user.fullname}</p>
                    </div>
                  </div>
                  <X onClick={() => clearSearchVisited(user._id)} className="text-gray-500 cursor-pointer" />
                </div>
              ))
            : userData?.slice(0, 5).map((user, i) => (
                <Link href={`${user._id}`} key={i} onClick={() => saveVisitedUser(user)} className="h-[58px] w-full bg-white flex  items-center justify-between px-6  hover:bg-gray-100 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="relative w-[44px] h-[44px] rounded-full overflow-hidden">
                      <Image
                        fill
                        src={user.profilePicture && user.profilePicture.startsWith('http') ? user.profilePicture : '/default-profile.jpg'}
                        alt="Profile picture"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{user.username}</p>
                      <p className=" text-gray-500">{user.fullname}</p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </motion.nav>
    </>
  );
};
