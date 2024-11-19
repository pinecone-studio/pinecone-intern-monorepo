import { MainFooter } from '@/components';
import { render } from '@testing-library/react';

describe('MainFooter', () => {
  it('should render successfully', async () => {
    render(<MainFooter />);
  });
});
