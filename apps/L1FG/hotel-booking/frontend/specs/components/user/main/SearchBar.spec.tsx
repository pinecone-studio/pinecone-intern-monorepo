import { SearchBar } from '@/components/user/main/SearchBar';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('SearchBar', () => {
  it('should render SearchBar successfully', async () => {
    render(<SearchBar />);
  });
});
