'use client';

import { Container, UserProfile } from '@/components';
import { ForgetPassword } from '@/components';
import { UserHistory } from '@/components';
import { useState } from 'react';

const Page = () => {
  const [selected, setSelected] = useState('profile');

  return (
    <Container>
      <div className="px-28 py-12 flex gap-6 bg-[#09090B]">
        <div className="flex flex-col gap-2">
          <button
            data-cy="Profile-Page"
            onClick={() => setSelected('profile')}
            className={`px-3 py-2 text-sm font-light w-56 rounded-lg flex justify-start ${selected === 'profile' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
          >
            Хэрэглэгчийн мэдээлэл
          </button>
          <button
            data-cy="Profile-Page-History"
            onClick={() => setSelected('history')}
            className={`px-3 py-2 text-sm font-light rounded-lg flex justify-start ${selected === 'history' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
          >
            Захиалгын түүх
          </button>
          <button
            data-cy="Profile-Page-ForgetPassword"
            onClick={() => setSelected('forgetPassword')}
            className={`px-3 py-2 text-sm font-light rounded-lg flex justify-start ${selected === 'forgetPassword' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
          >
            Нууц үг сэргээх
          </button>
        </div>
        <UserProfileMerge selected={selected} />
      </div>
    </Container>
  );
};

export default Page;

interface Names {
  selected: string;
}
const UserProfileMerge = ({ selected }: Names) => (
  <div className="w-full">
    {selected === 'profile' && (
      <div>
        <UserProfile data-cy="Profile-Page" />
      </div>
    )}
    {selected === 'history' && (
      <div>
        <UserHistory data-cy="Profile-Page-History"/>
      </div>
    )}
    {selected === 'forgetPassword' && (
      <div>
        <ForgetPassword data-cy="Profile-Page-ForgetPassword"/>
      </div>
    )}
  </div>
);
