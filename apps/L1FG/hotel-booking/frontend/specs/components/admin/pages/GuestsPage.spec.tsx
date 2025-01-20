import { GuestsPage } from '@/components/admin/pages/guest-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('GuestsPage', () => {
  it('should render successfully', async () => {
    render(<GuestsPage />);
  });
});
