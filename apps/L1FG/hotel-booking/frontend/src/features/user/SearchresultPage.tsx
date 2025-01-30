import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Loading } from '@/components/user/main/Loading';
import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import { BlueDital } from '@/components/user/ui/dital';
import { useGetHotelsQuery } from '@/generated';
import { Footer } from '@/components/user/search-result/Footer';

export const SearchResultPage = () => {
  const { loading, error, data } = useGetHotelsQuery();

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

  const hotels = data?.getHotels || [];

  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <MainResultSearch data={hotels} />
      <Footer />
    </>
  );
};
