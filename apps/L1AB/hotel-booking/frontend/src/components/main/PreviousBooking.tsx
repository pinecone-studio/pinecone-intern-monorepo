import { Booking } from '@/generated';
import { BookingCard } from './BookingCard';
import { NoPreviousBooking } from './NoPreviousBooking';

export const PreviousBooking = ({ data }: { data: Booking[] }) => {
  const previousData = data?.filter((el: any) => el.status !== 'booked');

  return (
    <div>
      {previousData?.length > 0 ? (
        <div>
          <p className="font-bold text-2xl mt-10">Booking Completed</p>
          {previousData.map((el, index) => (
            <div className="mt-5" key={el._id} data-testid={`previousData-${index}`}>
              <BookingCard
                photos={el.roomId.photos!}
                hotelName={el.roomId.hotelId.name}
                checkIn={el.checkIn}
                description={el.roomId.description}
                status={el.status}
                traveller={el.traveller}
                roomType={el.roomId.roomType}
                checkOut={el.checkOut}
              />
            </div>
          ))}
        </div>
      ) : (
        <NoPreviousBooking name={'No Previous Bookings'} />
      )}
    </div>
  );
};
