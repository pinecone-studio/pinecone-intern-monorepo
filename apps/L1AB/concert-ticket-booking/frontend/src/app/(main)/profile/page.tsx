'use client';

import { Container, UserProfile } from '@/components';
import { ForgetPassword } from '@/components';
import { UserHistory } from '@/components';
import { useState } from 'react';

const Page = () => {
  const [selected, setSelected] = useState('profile');

  return (
    <Container>
      <div className="px-28 py-12 flex gap-6 min-h-[48rem] max-h-fit max-sm:h-full max-sm:px-3 max-sm:grid max-sm:gap-6  max-md:h-full max-md:px-3 max-md:grid max-md:gap-6 max-lg:h-full max-lg:px-3 max-lg:grid max-lg:gap-6  max-xl:h-full max-xl:px-3 max-xl:grid max-xl:gap-6">
        <div className="flex flex-col gap-2 max-sm:grid max-sm:grid-cols-2 max-sm:h-fit  max-md:grid max-md:grid-cols-2 max-md:h-fit max-lg:grid max-lg:grid-cols-2 max-lg:h-fit max-xl:grid max-xl:grid-cols-3 max-xl:h-fit">
          <button
            data-cy="Profile-Page"
            onClick={() => setSelected('profile')}
            className={`px-3 py-2 text-sm font-light w-56 rounded-lg flex justify-start  max-md:w-full   ${selected === 'profile' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
          >
            Хэрэглэгчийн мэдээлэл
          </button>
          <button
            data-cy="Profile-Page-History"
            onClick={() => setSelected('history')}
            className={`px-3 py-2 text-sm font-light rounded-lg flex justify-start  max-md:w-full   ${selected === 'history' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
          >
            Захиалгын түүх
          </button>
          <button
            data-cy="Profile-Page-ForgetPassword"
            onClick={() => setSelected('forgetPassword')}
            className={`px-3 py-2 text-sm font-light rounded-lg flex justify-start  max-md:w-full   ${selected === 'forgetPassword' ? 'text-white bg-[#131313]' : 'text-gray-300'}`}
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
        <UserHistory data-cy="Profile-Page-History" />
      </div>
    )}
    {selected === 'forgetPassword' && (
      <div>
        <ForgetPassword data-cy="Profile-Page-ForgetPassword" />
      </div>
    )}
  </div>
);
