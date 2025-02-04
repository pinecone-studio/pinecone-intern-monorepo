import NotificationSection from '@/components/NotificationSection';

import { render } from '@testing-library/react';

describe('Sidemenu', () => {
  it('sidemenu successfull', async () => {
    render(<NotificationSection />);
  });
});
