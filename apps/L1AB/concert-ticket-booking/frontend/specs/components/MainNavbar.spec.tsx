import { MainNavbar } from '@/components';
import { render } from '@testing-library/react';

describe('MainNavbar', () => {
  it('should render successfully', async () => {
    render(<MainNavbar />);
  });
});
