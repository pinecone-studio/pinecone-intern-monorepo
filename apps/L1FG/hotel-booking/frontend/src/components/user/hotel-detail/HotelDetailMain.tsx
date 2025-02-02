import { Hotel } from '@/generated';
import { ChooseRoom } from './ChooseRoom';
import { DetailHero } from './DetailHero';
import { GeneralInformation } from './GeneralInformation';
import { About } from './About';

interface HotelDetailMainProps {
  data: Hotel | undefined | null;
}

export const HotelDetailMain = ({ data }: HotelDetailMainProps) => {
  return (
    <div className="w-full container mx-auto flex flex-col items-center  gap-8 px-[60px] py-8">
      <DetailHero />
      <GeneralInformation data={data} />
      <ChooseRoom />
      <About />
    </div>
  );
};
