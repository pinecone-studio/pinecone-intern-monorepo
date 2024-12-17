import { Booking } from '@/generated';
import { BookingCard } from './BookingCard';
import { StartBooking } from './StartBooking';
type ConfirmedBookingProps = {
  data: Booking[];
};

export const ConfirmedBooking = ({ data }: ConfirmedBookingProps) => {
  console.log(data, 'data===bookingData from ConfirmedBooking');
  const confirmedData = data?.filter((el: any) => el.status === 'booked');

  return (
    <div>
      {confirmedData?.length > 0 ? (
        <div>
          <p className="font-bold text-2xl mt-10">Confirmed Booking</p>
          {confirmedData.map((el, index) => (
            <div className="mt-5" key={el._id} data-testid={`confirmedData-${index}`}>
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
        <StartBooking name={'Start a new booking'} />
      )}
    </div>
  );
};
