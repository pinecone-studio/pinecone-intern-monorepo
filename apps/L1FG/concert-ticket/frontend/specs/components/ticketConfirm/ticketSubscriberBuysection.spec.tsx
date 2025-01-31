import React from 'react';
import { render } from '@testing-library/react';
import TicketSubscriberBuysection from '@/components/ticketConfirm/ticketSubscriberBuysection';

describe('TicketSubscriberBuysection', () => {
  it('renders the component without crashing', () => {
    render(<TicketSubscriberBuysection />);
  });
});
