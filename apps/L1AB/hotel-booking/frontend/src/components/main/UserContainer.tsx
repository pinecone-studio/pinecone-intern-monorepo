'use client';
import { Container } from './assets';
import { UserHeader } from './UserHeader';
import { UserProfile } from './UserProfile';
import { UserContact } from './UserContact';
import { useState } from 'react';
import { UserSettings } from './UserSettings';

export const UserContainer = () => {
  const [selected, setSelected] = useState('profile');
  return (
    <>
      <UserHeader />
      <Container backgroundColor="bg-white">
        <div className="flex m-auto">
          <div className="container m-auto h-fit px-5 pt-10 pb-10 flex-1">
            <h3 className="text-2xl font-semibold text-[#09090B]">Hi, Shagai</h3>
            <p className="text-[#71717A] text-base font-thin mb-2">n.shagai@pinecone.mn</p>
            <div className="border border-x-2"></div>
          </div>
        </div>

        <div className="flex gap-6 h-full">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelected('profile')}
              className={`pl-4 py-2 text-sm font-medium flex w-56 rounded-md justify-start ${selected === 'profile' ? 'text-[#09090B] bg-[#F4F4F5]' : 'text-[#09090B]'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setSelected('contact')}
              className={`pl-4 py-2 text-sm font-medium flex w-56 rounded-md justify-start ${selected === 'contact' ? 'text-[#09090B] bg-[#F4F4F5]' : 'text-[#09090B]'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setSelected('settings')}
              className={`pl-4 py-2 text-sm font-medium flex w-56 rounded-md justify-start ${selected === 'settings' ? 'text-[#09090B] bg-[#F4F4F5]' : 'text-[#09090B]'}`}
            >
              Settings
            </button>
          </div>
          <UserProfileMerge selected={selected} />
        </div>

        <div className="flex items-center gap-2">
          <div className="container m-auto flex  items-center justify-between">
            <div className="flex gap-1 py-3 px-4 items-center mt-10">
              <div className="w-4 h-4 rounded-full bg-[#09090B]"></div>
              <div className="font-normal text-base flex font-sans">Pedia</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

interface Names {
  selected: string;
}
const UserProfileMerge = ({ selected }: Names) => {
  return (
    <div className="w-full">
      {selected === 'profile' && (
        <div>
          <UserProfile />
        </div>
      )}
      {selected === 'contact' && (
        <div>
          <UserContact />
        </div>
      )}
      {selected === 'settings' && (
        <div>
          <UserSettings />
        </div>
      )}
    </div>
  );
};
