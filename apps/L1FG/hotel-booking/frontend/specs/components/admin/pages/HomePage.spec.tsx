import { HomePage } from '@/components/admin/pages/home-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HomePage', () => {
  it('should render successfully', async () => {
    render(<HomePage />);
  });
});
