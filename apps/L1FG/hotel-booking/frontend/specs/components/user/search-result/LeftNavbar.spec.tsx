import { LeftNavbar } from '@/components/user/search-result/LeftNavbar';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('LeftNavbar', () => {
  it('should render LeftNavbar successfully', async () => {
    render(<LeftNavbar />);
  });
});
