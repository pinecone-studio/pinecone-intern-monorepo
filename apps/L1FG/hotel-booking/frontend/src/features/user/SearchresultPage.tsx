import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { SearchBar } from '@/components/user/main/SearchBar';
import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import { BlueDital } from '@/components/user/ui/dital';

export const SearchResultPage = () => {
  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <MainResultSearch />
    </>
  );
};
