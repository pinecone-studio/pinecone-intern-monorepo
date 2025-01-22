import { ChooseRoom } from './ChooseRoom';
import { DetailHero } from './DetailHero';
import { GeneralInformation } from './GeneralInformation';

export const HotelDetailMain = () => {
  return (
    <div className="w-full container mx-auto flex flex-col items-center  gap-8 px-[60px] py-8">
      <DetailHero />
      <GeneralInformation />
      <ChooseRoom />
    </div>
  );
};
