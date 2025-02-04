import Page from '@/components/ticketConfirm/Payment';
import { render } from '@testing-library/react';

describe('payment', () => {
  it('render payment', async () => {
    render(<Page />);
  });
});
