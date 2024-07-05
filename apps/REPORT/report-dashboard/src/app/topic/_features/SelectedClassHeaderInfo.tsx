import { LogoOnly } from '@/components/Logo';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';

type ClassName = {
  text: string;
  profile: string;
  name: string;
};
export const SelectedClassHeaderInfo = (props: ClassName) => {
  const { text, profile, name } = props;
  return (
    <div className="flex justify-between mx-8 my-5">
      <div className="flex gap-2">
        <FaArrowLeft size={30} />
        <LogoOnly />
        <p className="font-bold text-center  text-xl ">{text}</p>
      </div>
      <div>
        <div className="flex gap-2">
          <Image width={40} height={40} src={profile} alt="profile" />
          <div>
            <p className="text-2sm font-bold">{name}</p>
            <p className="text-sm">Багш</p>
          </div>
          <div className="flex justify-center items-center">
            <FaAngleDown />
          </div>
        </div>
      </div>
    </div>
  );
};
