import { Search } from '../features/Search';
import { NavigationBlue } from '../Navigations';
import { MainResultSearch } from '../search-result/MainSearchResult';
import { BlueDital } from '../ui/microui';

export const SearchResultPage = () => {
  return (
    <div>
      <NavigationBlue />
      <BlueDital />
      <Search />
      <MainResultSearch />
    </div>
  );
};
