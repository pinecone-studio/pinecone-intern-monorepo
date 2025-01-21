import { SearchResultPage } from '@/components/user/pages/searchresult-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('SearchResultPage', () => {
  it('should render successfully', async () => {
    render(<SearchResultPage />);
  });
});
