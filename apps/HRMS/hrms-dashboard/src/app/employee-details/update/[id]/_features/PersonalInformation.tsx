'use client';
import Image from 'next/image';
import { BagIcon } from '../../../../../../public/assets/BagIcon';
import { LocationIcon } from '../../../../../../public/assets/LocationIcon';
import { Mailicon } from '../../../../../../public/assets/MailIcon';
import { PhoneIcon } from '../../../../../../public/assets/PhoneIcon';
import { UpdateButton } from '../../../_components';

interface PersonalInformationProps {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  homeAddress?: string | null;
  imageUrl?: string | null;
}
export const PersonalInformation = ({ firstName, lastName, email, phone, jobTitle, homeAddress, imageUrl }: PersonalInformationProps) => {
  const address = homeAddress || 'Ulaanbaatar, Mongolia';
  return (
    <div className=" w-full h-full flex flex-col bg-white rounded-xl p-5  gap-1 overflow-hidden">
      <div className="flex gap-[40px] w-[100%] justify-between ">
        <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
        <UpdateButton />
      </div>
      <div className="w-1/3 sm:w-1/2 aspect-square rounded-full overflow-hidden m-auto relative">
        <Image fill style={{ objectFit: 'cover' }} src={imageUrl || '/avatar.png'} alt="profile picture" />
      </div>
      <h2 className="text-[18px] font-semibold flex justify-center">{`${firstName} ${lastName}`}</h2>
      <div className=" flex flex-col justify-start bg-white w-full h-fit gap-4 max-w-[280px] m-auto ">
        <div className="flex gap-3 items-center">
          <BagIcon />
          <p> {jobTitle}</p>
        </div>
        <div className="flex gap-3 items-center">
          <PhoneIcon />
          <p> {phone}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Mailicon />
          <p>{email}</p>
        </div>
        <div className="flex gap-3 items-center">
          <LocationIcon />
          <p> {address}</p>
        </div>
      </div>
    </div>
  );
};
