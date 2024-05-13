'use client';
import Image from 'next/image';
import { useState } from 'react';
import { BagIcon } from '../../../../../../public/assets/BagIcon';
import { LocationIcon } from '../../../../../../public/assets/LocationIcon';
import { Mailicon } from '../../../../../../public/assets/MailIcon';
import { PhoneIcon } from '../../../../../../public/assets/PhoneIcon';
import { PenIcon } from '../../../../../../public/assets/PenIcon';
import { PersonalUpdateModal } from './PersonalUpdateModal';
interface PersonalInformationProps {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  homeAddress?: string | null;
  imageUrl?: string | null;
}

const PersonalInformation = ({ firstName, lastName, email, phone, jobTitle, homeAddress, imageUrl }: PersonalInformationProps) => {
  const address = homeAddress || 'Ulaanbaatar, Mongolia';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div data-testid="personal-info" className=" w-full flex flex-col bg-white rounded-xl p-5 gap-10">
      <div className="flex gap-[40px] w-[100%] justify-between">
        <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
        <button
          data-testid="update-button-info"
          className="bg-[#F6F6F6] px-2 py-[10px] items-center rounded-[8px] flex gap-2 "
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <PenIcon />
          <p className="text-main text-[14px] items-center">Засварлах</p>
        </button>
      </div>
      <div className="w-1/3 sm:w-1/2 aspect-square rounded-full overflow-hidden m-auto relative">
        <Image data-testid="profile-picture" fill style={{ objectFit: 'cover' }} src={imageUrl || '/avatar.png'} alt="profile picture" />
      </div>
      <h2 className="text-[18px] font-semibold flex justify-center">{`${firstName} ${lastName}`}</h2>
      <div className="flex flex-col gap-4 max-w-[280px] m-auto">
        <div className="flex gap-3 items-center">
          <BagIcon />
          <p>{jobTitle}</p>
        </div>
        <div className="flex gap-3 items-center">
          <PhoneIcon />
          <p>{phone}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Mailicon />
          <p>{email}</p>
        </div>
        <div className="flex gap-3 items-center">
          <LocationIcon />
          <p>{address}</p>
        </div>
      </div>
      {isModalOpen && (
        <PersonalUpdateModal lastName={lastName} homeAddress={address} firstName={firstName} email={email} phone={phone} jobTitle={jobTitle} imageUrl={imageUrl} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default PersonalInformation;
