import * as React from 'react';
import { render } from '@testing-library/react';
import TicketSubscriber from '@/components/ticketConfirm/TicketSubscriber';

describe('TicketSubscriber Component', () => {
  it('renders the component with the correct title', () => {
    render(<TicketSubscriber />);
  });
});
