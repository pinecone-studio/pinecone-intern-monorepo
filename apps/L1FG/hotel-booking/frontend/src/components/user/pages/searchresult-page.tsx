import { Footer } from '../search-result/Footer';
import { MainResultSearch } from '../search-result/MainSearchResult';
import HomePage from './home-page';

export const SearchResultPage = () => {
  return (
    <div>
      <HomePage />
      <MainResultSearch />
      <Footer />
    </div>
  );
};
