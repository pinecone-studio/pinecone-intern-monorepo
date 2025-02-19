'use client';

import { Input } from '@/components/ui/input';
import { Users } from './Users';
import { useState } from 'react';
import { useDeleteAllSearchUserMutation, useGetUserByNameQuery } from '@/generated';
import { SavedUsers } from './SavedUsers';

type Props = {
  searchOpen: boolean;
  setSearchOpen: (_searchOpen: boolean) => void;
};

// eslint-disable-next-line complexity
export const SearchSheet = ({ searchOpen, setSearchOpen }: Props) => {
  const [deleteAll] = useDeleteAllSearchUserMutation({
    refetchQueries: ['GetSearchedUser'],
  });

  const [userName, setUserName] = useState('');

  const { data, loading } = useGetUserByNameQuery({
    variables: { userName },
    skip: !userName,
  });

  const users = loading || data?.getUserByName;

  return (
    <>
      <div
        data-testid="search-sheet"
        className={`fixed top-0 left-[80px] w-[396px] h-full bg-white border-l shadow-lg transform transition-transform duration-500 ease-in-out z-40 rounded-r-xl ${
          searchOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-3">
          <h1 data-testid="Search" className="text-2xl font-bold p-4">
            Search
          </h1>
        </div>
        <div className="flex relative w-[364px] mx-auto border-b">
          <Input
            data-testid="input"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="px-4 w-full justify-center flex items-center bg-accent border-none"
            placeholder="Search"
          />

          <p
            onClick={() => setUserName('')}
            data-testid="click-x"
            className="w-[16px] h-[16px] rounded-full text-white text-xs bg-gray-300 items-center justify-center flex absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            x
          </p>
        </div>
        {userName ? (
          <Users loading={loading} data-testid="user-component" users={users as []} setSearchOpen={setSearchOpen} setUserName={setUserName} />
        ) : (
          <SavedUsers onclcik={deleteAll} setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
        )}

        <div className="overflow-y-auto h-[calc(100vh-60px)]"></div>
      </div>

      {searchOpen && <div data-testid="open-sheet" className="fixed inset-0 bg-none w-[1200px] z-30" onClick={() => setSearchOpen(false)} />}
    </>
  );
};
