import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Search } from '@/components/main';

describe('Main Search', () => {
  it('should render the main search', () => {
    render(<Search />);
  });
});
