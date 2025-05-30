import React from 'react';
import ProfileForm from './_feature/ProfileForm';



const ProfilePage = () => {
  return (
    <div data-cy="profile-page" className="w-full">
      <p className="text-[18px] font-bold">Personal Information</p>
      <p className="text-[#71717A] text-[14px]">This is how others will see you on the site.</p>
      <div className="w-full h-[1px] bg-gray-300 my-[24px]"></div>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
