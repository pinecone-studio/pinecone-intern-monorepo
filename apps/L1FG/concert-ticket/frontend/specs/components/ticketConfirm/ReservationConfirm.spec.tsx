import Page from '@/components/ticketConfirm/ReservationConfirm';
import { render } from '@testing-library/react';

describe('reservation confirm', () => {
  it('render component', async () => [render(<Page />)]);
});
