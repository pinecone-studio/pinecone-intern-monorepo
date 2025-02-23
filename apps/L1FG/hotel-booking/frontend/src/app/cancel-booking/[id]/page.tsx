import CancelBookingPage from '@/features/user/booking/CancelBookingPage';

const CancelBooking = ({ params }: { params: { id: string } }) => {
  const idParams = params.id;
  return (
    <main>
      <CancelBookingPage idParams={idParams} />
    </main>
  );
};

export default CancelBooking;
