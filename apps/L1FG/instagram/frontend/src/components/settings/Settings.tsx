'use client';
import React, { useState } from 'react';

export const Settings = () => {
  const [text, setText] = useState('');
  const maxLength = 150;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="w-[600px] h-[720px] flex flex-col justify-between">
      <p className="font-sans text-[30px] font-semibold leading-[36px] tracking-tightest text-text-foreground">Edit Profile</p>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-[50%] bg-black"></div>
            <p>name</p>
          </div>
          <div>
            <select defaultValue="" id="profile-photo" name="profile-photo" className="w-[197px] h-[36px] bg-[#F4F4F5] py-2 px-2 rounded-lg">
              <option disabled className="text-[#18181B] font-inter text-[14px] font-medium leading-[20px]">
                Change profile photo
              </option>
              <option value="upload">Upload New Photo</option>
              <option value="remove">Remove Current Photo</option>
              <option value="">Cancel</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Name</p>
          <div className="flex flex-col gap-3">
            <input type="text" className="w-[600px] h-[40px] border border-[#E4E4E7] rounded-md px-3" />
            <p className="font-sans text-[12px] font-normal leading-[16px] text-grayCustom">
              Help people discover your account by using the name you re known by: either your full name, nickname, or business name.
            </p>
            <p className="font-sans text-[12px] font-normal leading-[16px] text-grayCustom">You can only change your name twice within 14 days.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Username</p>
          <input type="text" className="w-[600px] h-[40px] border border-[#E4E4E7] rounded-md px-3" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Bio</p>
          <div>
            <textarea value={text} onChange={handleChange} data-testid="textarea" className="w-[600px] h-[132px] border border-[#E4E4E7] rounded-md p-3" />
            <div data-testid="character-count" className="text-sm text-gray-500 mt-2 flex justify-end">
              {text.length}/{maxLength} үсэг
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Gender</p>
          <select defaultValue="" id="options" name="options" className="w-[600px] h-[36px] px-3 border border-[#E4E4E7] rounded-md">
            <option value="option1">Female</option>
            <option value="option2">Male</option>
            <option value="option3">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="w-[80px] h-[36px]"></div>
    </div>
  );
};
