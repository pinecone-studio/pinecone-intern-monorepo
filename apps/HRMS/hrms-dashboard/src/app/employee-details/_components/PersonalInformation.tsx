'use client';
import { Bag } from '../../../../public/assets/Bag';
import { Location1 } from '../../../../public/assets/Location1';
import { Mail } from '../../../../public/assets/Mail';
import { Phone } from '../../../../public/assets/Phone';
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
    <div className="max-w-[358px] w-full flex flex-col bg-white rounded-xl p-5 items-center gap-10">
      <div className="flex gap-[40px] w-[100%] justify-center items-center">
        <p className="text-[18px] font-semibold">Хувийн мэдээлэл</p>
        <button>Засварлах</button>
      </div>
      <div className="w-1/2 aspect-square rounded-full overflow-hidden m-auto relative">
        <img src={imageUrl!} alt="" />
      </div>
      <h2 className="text-[18px] font-semibold">{`${firstName} ${lastName}`}</h2>
      <div className="w-[230px] flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <Bag />
          <p> {jobTitle}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Phone />
          <p> {phone}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Mail />
          <p>{email}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Location1 />
          <p> {address}</p>
        </div>
      </div>
    </div>
  );
};
