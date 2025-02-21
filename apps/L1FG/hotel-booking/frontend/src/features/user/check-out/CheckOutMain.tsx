import { GuestInfoSection } from './GuestInfoSection';
import { Room } from '@/generated';

type checkOutProps = {
  room : Room | null | undefined;
}

export const CheckOutMain = (room : checkOutProps) => {
  return (
    <div className="container mx-auto flex py-8 justify-between">
      <GuestInfoSection room ={room.room}/>
    </div>
  );
};
