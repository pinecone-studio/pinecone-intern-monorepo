'use client';
import { Container } from './assets';
import { UserProfile } from './UserProfile';
import { UserContact } from './UserContact';
import { useState } from 'react';
import { UserSettings } from './UserSettings';
import { useAuth } from '../providers/Auth.Provider';

export const UserContainer = () => {
  const [selected, setSelected] = useState('profile');
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Container backgroundColor="bg-white">
        <div className="flex m-auto">
          <div className="container m-auto h-fit px-5 pt-10 pb-10 flex-1">
            <h3 className="text-2xl font-semibold text-[#09090B]">Hi hi{user?.email}</h3>
            <p className="text-[#71717A] text-base font-thin mb-2">{user?.email}</p>
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
