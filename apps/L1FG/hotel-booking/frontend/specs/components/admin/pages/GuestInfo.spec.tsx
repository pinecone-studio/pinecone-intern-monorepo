import { GuestInfo } from '@/components/admin/pages/guest-info';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('GuestInfo', () => {
  it('should render successfully', async () => {
    render(<GuestInfo />);
  });
});
