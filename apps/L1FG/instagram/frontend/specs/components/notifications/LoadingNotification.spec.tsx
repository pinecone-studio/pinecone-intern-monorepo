import { LoadingNotification } from '@/components/notifications/LoadingNotification';
import { render } from '@testing-library/react';

describe('Profile preview skeleton', () => {
  it('SHould render', () => {
    render(<LoadingNotification />);
  });
});
