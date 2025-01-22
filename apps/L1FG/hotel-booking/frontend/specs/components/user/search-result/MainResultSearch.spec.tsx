import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('MainResultSearch', () => {
  it('should render MainResultSearch successfully', async () => {
    render(<MainResultSearch />);
  });
});
