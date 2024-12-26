"use client";

import { Container } from '@/components';
import { useUpdateBookingEverythingMutation, useGetBookingByIdQuery } from '@/generated';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, loading, error } = useGetBookingByIdQuery({ variables: { id: id as string } });
  const bookingDetails = data?.getBookingById?.status;

  const [updateBooking] = useUpdateBookingEverythingMutation();

  const handleUpdateBooking = async () => {
    try {
      await updateBooking({
        variables: {
          input: { _id: id as string, status: 'Used' },
        },
      });
      alert('Төлөв амжилттай шинэчлэгдлээ!');
    } catch (error) {
      console.error('Шинэчлэхэд алдаа гарлаа:', error);
      alert('Алдаа гарлаа.');
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Алдаа гарлаа: {error.message}</Container>;
  }

  return (
    <Container>
      <div className="flex items-center justify-center w-full">
        {bookingDetails !== 'Used' && (
          <div
            className="px-4 py-2 bg-green-400 rounded-lg cursor-pointer hover:bg-green-500"
            onClick={handleUpdateBooking}
          >
            Used төлөвт шилжүүлэх
          </div>
        )}
        {bookingDetails === 'Used' && (
          <div className="px-4 py-2 bg-gray-300 rounded-lg cursor-not-allowed">
            Already Used or Cancelled
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
