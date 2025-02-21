import { NavigationWhite } from '@/features/user/main/NavigationWhite';
import { Loading } from '@/components/user/main/Loading';
import { MainProfile } from '@/features/user/profile';
import { useGetHotelsQuery } from '@/generated';
import { FooterSmall } from '@/components/user/booking-page/FooterSmall';

export const ProfilePage = () => {
  const { loading } = useGetHotelsQuery();

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col min-h-screen">
      <NavigationWhite />;
      <MainProfile />
      <FooterSmall />
    </main>
  );
};
