import { RightNavbar } from '@/components/user/search-result/RightNavbar';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('RightNavbar', () => {
  it('should render successfully', async () => {
    render(<RightNavbar />);
  });
});
