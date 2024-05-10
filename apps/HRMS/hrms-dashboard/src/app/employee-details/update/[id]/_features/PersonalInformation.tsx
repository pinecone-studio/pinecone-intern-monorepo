'use client';
import { BagIcon } from '../../../../../../public/assets/BagIcon';
import { LocationIcon } from '../../../../../../public/assets/LocationIcon';
import { Mailicon } from '../../../../../../public/assets/MailIcon';
import { PhoneIcon } from '../../../../../../public/assets/PhoneIcon';

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
    <div className=" w-full flex flex-col bg-white rounded-xl p-5  gap-10">
      <div className="flex gap-[40px] w-[100%] justify-between ">
        <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
        <button>Засварлах</button>
      </div>
      <div className="w-1/2 aspect-square rounded-full overflow-hidden m-auto relative">
        <img src={imageUrl!} alt="" />
      </div>
      <h2 className="text-[18px] font-semibold flex justify-center">{`${firstName} ${lastName}`}</h2>
      <div className=" flex flex-col gap-4 max-w-[280px] m-auto ">
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
