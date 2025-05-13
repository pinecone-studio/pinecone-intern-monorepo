'use client';

import { UserProfile, useUser } from '@clerk/nextjs';

const UseProfile = () => {
  return (
    <div>
      <h1 data-cyid="Хэрэглэгчийн хэсэг" className="text-center font-bold text-[#441500] text-[1.3rem] mt-5 mb-5">
        Хэрэглэгчийн хэсэг
      </h1>{' '}
      <div className="flex justify-center">
        <div data-cyid=" user-profile">
          <UserProfile routing="hash" />
        </div>
      </div>
    </div>
  );
};

export default UseProfile;
