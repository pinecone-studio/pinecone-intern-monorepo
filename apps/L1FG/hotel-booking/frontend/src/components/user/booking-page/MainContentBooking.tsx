import { Booking } from '@/generated';
import { NoBooking } from './NoBooking';
import { NoPrevious } from './NoPrevious';
import { BookingCard } from '../../../features/user/booking/BookingCard';

interface MainContentBookingProps {
  filtredBookedData: (Booking | null)[];
  filtredDataCC: (Booking | null)[];
}

export const MainContentBooking = ({ filtredBookedData, filtredDataCC }: MainContentBookingProps) => {
  console.log(filtredDataCC, 'filtredDataCC');

  return (
    <div className="max-w-[960px] w-full mx-auto p-8 flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-2xl font-Inter font-semibold not-italic tracking-[-0.6px]">Comfirmed Booking</h3>
        {filtredBookedData.length === 0 ? <NoBooking /> : filtredBookedData.map((booked) => <BookingCard key={booked?.id} booked={booked} />)}
      </div>
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-2xl font-Inter font-semibold not-italic tracking-[-0.6px]">Previous Booking</h3>
        {filtredDataCC.length === 0 ? <NoPrevious /> : filtredDataCC.map((booked) => <BookingCard key={booked?.id} booked={booked} />)}
      </div>
    </div>
  );
};
