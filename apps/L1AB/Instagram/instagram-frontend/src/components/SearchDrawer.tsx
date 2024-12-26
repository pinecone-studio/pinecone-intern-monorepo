'use client ';

import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetUserBySearchQuery } from '@/generated';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const variants = {
  close: { x: 0, opacity: 0, transition: { type: 'spring', damping: 15, duration: 0.5 }, width: 0 },
  open: { x: 0, opacity: 1, transition: { type: 'spring', damping: 15, duration: 0.5 }, width: 411 },
};

interface SearchProps {
  isOpen: boolean;
  toggleSearchDrawer: () => void;
  visitedUsers: Record<string, string>[];
  visitedUsersHandler: (_user: Record<string, string>[]) => void;
}
export const SearchDrawer = ({ isOpen, visitedUsers, visitedUsersHandler }: SearchProps) => {
  const [searchInput, setSearchInput] = useState('');

  const { data } = useGetUserBySearchQuery({
    skip: !searchInput,
    variables: { searchInput },
  });

  const userData = data?.getUserBySearch;

  const saveVisitedUser = (user: any) => {
    const storedUsers = JSON.parse(localStorage.getItem('visitedUsers') || '[]');
    const updatedUsers = [...storedUsers, user];
    const uniqueUsers = Array.from(new Set(updatedUsers.map((u: any) => u._id))).map((id) => updatedUsers.find((u: any) => u._id === id));
    localStorage.setItem('visitedUsers', JSON.stringify(uniqueUsers));
    visitedUsersHandler(uniqueUsers);
  };

  const deleteVisitUser = (userId: string) => {
    const updatedVisited = visitedUsers.filter((user) => user._id !== userId);
    visitedUsersHandler(updatedVisited);
    localStorage.setItem('visitedUsers', JSON.stringify(updatedVisited));
  };

  const clearAllVisitedHistory = () => {
    localStorage.removeItem('visitedUsers');
    visitedUsersHandler([]);
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
        className={`z-10 drawer dark:bg-black bg-white fixed space-y-5  border h-full left-[80px] rounded-r-2xl divide-y divide-slate-200 transition-transform duration-100 ${
          isOpen ? 'w-[411px]' : 'w-0'
        }`}
        style={{
          boxShadow: '10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="space-y-5 py-6 px-4">
          <h1 className="font-semibold dark:text-[#dddddd] text-2xl">Search</h1>
          <div className="relative  w-full  bg-gray-100 dark:bg-[#343434] rounded-lg h-10 flex px-4 py-1 items-center text-gray-500 gap-4">
            <Search size={16} className="" />
            <input
              data-testid="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="bg-transparent w-full h-full outline-none  font-light"
            ></input>
            {searchInput && (
              <button data-testid="search-clear" onClick={() => setSearchInput('')} className="absolute right-4 font-xs  bg-gray-300 text-white rounded-full transition-colors">
                <X size={10} className="m-0.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <div className=" space-y-4 dark:border-[#444444] px-6 py-4 ">
            <div className="flex justify-between">
              <span className="font-medium">Recent</span>
              <span data-testid="delete-all" onClick={clearAllVisitedHistory} className="text-blue-500 text-sm cursor-pointer">
                Clear all
              </span>
            </div>
          </div>

          {!searchInput
            ? visitedUsers.map((user, i) => (
                <div data-testid={`search-visited-${i}`} key={i} className="h-[58px] w-full bg-white dark:bg-black flex items-center justify-between px-6 hover:bg-gray-100">
                  <Link href={`/profile?type=posts&username=${user?.username}`} className="flex gap-3 w-80">
                    <div className="relative w-[44px] h-[44px] rounded-full overflow-hidden">
                      <Image
                        fill
                        src={user.profilePicture && user.profilePicture.startsWith('https') ? user.profilePicture : '/default-profile.jpg'}
                        alt="Profile picture"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-gray-500">{user.fullname}</p>
                    </div>
                  </Link>
                  <X data-testid={`delete-one-${i}`} onClick={() => deleteVisitUser(user._id)} className="text-gray-500 cursor-pointer" />
                </div>
              ))
            : userData?.slice(0, 5).map((user, i) => (
                <Link
                  data-testid={`to-profile-${i}`}
                  href={`/profile?type=posts&username=${user?.username}`}
                  key={i}
                  onClick={() => saveVisitedUser(user)}
                  className="h-[58px] w-full bg-white flex  items-center justify-between px-6  hover:bg-gray-100 cursor-pointer"
                >
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
