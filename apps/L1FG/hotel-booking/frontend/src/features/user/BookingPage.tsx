import { FooterSmall, MainContentBooking } from '@/components/user/booking-page';
import { Loading } from '@/components/user/main/Loading';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import { useGetHotelsQuery } from '@/generated';

export const BookingPage = () => {
  const { loading, error } = useGetHotelsQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavigationWhite />
      <MainContentBooking />
      <FooterSmall />
    </div>
  );
};
