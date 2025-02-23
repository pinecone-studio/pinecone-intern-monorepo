import { BookingDetailPage } from '@/features/user/BookingDetailPage';

const BookingDetail = ({ params }: { params: { id: string } }) => {
  const idParams = params.id;
  return <BookingDetailPage idParams={idParams} />;
};

export default BookingDetail;
