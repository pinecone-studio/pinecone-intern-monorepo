import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TicketSubscriber from '@/components/ticketConfirm/TicketSubscriber';

describe('TicketSubscriber Component', () => {
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it('calls handleChange when phone number input is changed', () => {
    render(<TicketSubscriber handleChange={mockHandleChange} />);

    const phoneInput = screen.getByTestId('reservation-phone-number-input');
    fireEvent.change(phoneInput, { target: { value: '99001234' } });

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'phoneNumber',
          value: '99001234',
        }),
      })
    );
  });

  it('calls handleChange when email input is changed', () => {
    render(<TicketSubscriber handleChange={mockHandleChange} />);

    const emailInput = screen.getByTestId('reservation-email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'email',
          value: 'test@example.com',
        }),
      })
    );
  });
});
