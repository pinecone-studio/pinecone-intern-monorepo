import React from 'react';
import { render } from '@testing-library/react';
import TicketSubscriberBuysection from '@/components/ticketConfirm/TicketBuySection';

describe('TicketSubscriberBuysection', () => {
  it('renders the component without crashing', () => {
    render(<TicketSubscriberBuysection />);
  });
});
