import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Ticketreservation from '@/components/ticketReservation/Ticketreservation';

describe('Ticketreservation', () => {
  it('render Ticketreservation component', () => {
    render(<Ticketreservation />);
  });
});
