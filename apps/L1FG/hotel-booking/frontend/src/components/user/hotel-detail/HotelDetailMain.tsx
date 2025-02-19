import { Hotel, Room } from '@/generated';
import { ChooseRoom } from './ChooseRoom';
import { DetailHero } from './DetailHero';
import { GeneralInformation } from './GeneralInformation';
import { About } from './About';

export interface HotelDetailMainProps {
  data: Hotel | undefined | null;
  hotelRoomData: (Room | null)[] | undefined | null;
}

export const HotelDetailMain = ({ data, hotelRoomData }: HotelDetailMainProps) => {
  return (
    <div className="w-full container mx-auto flex flex-col items-center  gap-8 px-[60px] py-8">
      <DetailHero />
      <GeneralInformation data={data} />
      <ChooseRoom hotelRoomData={hotelRoomData} />
      <About />
    </div>
  );
};
