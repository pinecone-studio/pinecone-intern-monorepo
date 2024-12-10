'use client';
import { BookingCard, NoPreviousBooking, StartBooking } from '@/components/main';
import { useGetBookingByIdQuery } from '@/generated';

export const BookingComponent = () => {
  const bookingId = '6756916da16039f4108550f4' as string;
  // const bookingId = '6756c3ff0bf3c5bc42b9020a' as string;
  // const bookingId = '6756c4120bf3c5bc42b9020c' as string;

  const { data } = useGetBookingByIdQuery({ variables: { id: bookingId } });

  const confirmedData = data?.getBookingById.filter((el) => el.status === 'booked');

  const previousData = data?.getBookingById.filter((el) => el.status !== 'booked');

  return (
    <div className="max-w-fit m-auto">
      {confirmedData?.length !== 0 ? (
        <div>
          <p className="font-bold text-2xl mt-10">Confirmed Booking</p>
          {confirmedData?.map((el, index) => (
            <div className="mt-5" data-testid={`confirmedData-${index}`}>
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
        <>
          <StartBooking />
          <NoPreviousBooking />
        </>
      )}

      {previousData?.length !== 0 ? (
        <p>previousData Bainaaaaa</p>
      ) : (
        <>
          <NoPreviousBooking />
        </>
      )}
    </div>
  );
};
