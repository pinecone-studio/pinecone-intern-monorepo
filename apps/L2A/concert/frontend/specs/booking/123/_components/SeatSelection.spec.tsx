import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SeatSelection from '@/app/booking/[id]/_components/SeatSelection';
import '@testing-library/jest-dom';

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  window.alert = jest.fn();
});

describe('SeatSelection Component', () => {
  const eventData = {
    seatData: [
      {
        date: '2025-05-13',
        seats: {
          VIP: { availableTickets: 2, price: 100000 },
          Standard: { availableTickets: 3, price: 50000 },
          Backseat: { availableTickets: 1, price: 25000 },
        },
      },
    ],
  } as any;

  it('renders fallback message if no seatData available (covers: options.length === 0)', () => {
    render(<SeatSelection event={{ seatData: [] } as any} />);
    expect(screen.getByText('Тасалбар дууссан!')).toBeInTheDocument();
  });

  it('renders ticket options and covers options.length > 0 with data-testid', () => {
    render(<SeatSelection event={eventData} />);
    expect(screen.getByTestId('ticket-list')).toBeInTheDocument();
    expect(screen.getByText('VIP тасалбар (2)')).toBeInTheDocument();
    expect(screen.getByText('Энгийн тасалбар (3)')).toBeInTheDocument();
    expect(screen.getByText('Арын тасалбар (1)')).toBeInTheDocument();
  });

  it('renders fallback when options is empty (covers options.length === 0 with data-testid)', () => {
    const emptyEvent = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {},
        },
      ],
    } as any;

    render(<SeatSelection event={emptyEvent} />);
    expect(screen.getByTestId('no-options')).toBeInTheDocument();
    expect(screen.getByText('Энд тасалбарын сонголт байхгүй байна')).toBeInTheDocument();
  });

  it('includes only tickets with availableTickets >= 0 and valid price', () => {
    const faultyEvent = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {
            VIP: { availableTickets: -1, price: 100000 },
            Standard: { availableTickets: 2 },
            Backseat: { availableTickets: 2, price: 25000 },
          },
        },
      ],
    } as any;

    render(<SeatSelection event={faultyEvent} />);
    expect(screen.queryByText(/VIP тасалбар/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Энгийн тасалбар/)).not.toBeInTheDocument();
    expect(screen.getByText('Арын тасалбар (2)')).toBeInTheDocument();
  });

  it('allows increment and decrement of tickets', () => {
    render(<SeatSelection event={eventData} />);
    const plusButtons = screen.getAllByText('+');
    const minusButtons = screen.getAllByText('-');

    fireEvent.click(plusButtons[0]);
    expect(screen.getAllByText('1')).toHaveLength(1);

    fireEvent.click(minusButtons[0]);
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('disables "Тасалбар авах" button if no tickets are selected', () => {
    render(<SeatSelection event={eventData} />);
    const button = screen.getByRole('button', { name: /Тасалбар авах/ });
    expect(button).toBeDisabled();
  });

  it('enables button and saves booking (covers map, reduce, selectedDay || "")', () => {
    render(<SeatSelection event={eventData} />);
    const plusButtons = screen.getAllByText('+');
    const purchaseButton = screen.getByRole('button', { name: /Тасалбар авах/ });

    fireEvent.click(plusButtons[0]);
    fireEvent.click(plusButtons[1]);

    expect(purchaseButton).toBeEnabled();

    fireEvent.click(purchaseButton);

    const expectedBooking = {
      date: '2025-05-13',
      tickets: [
        { type: 'Арын тасалбар', count: 1, price: 25000 },
        { type: 'Энгийн тасалбар', count: 1, price: 50000 },
      ],
      totalPrice: 75000,
    };

    const calls = (localStorage.setItem as jest.Mock).mock.calls;
    const savedValue = calls.find(([key]) => key === 'booking')?.[1];
    expect(savedValue).toBeDefined();
    const parsedBooking = JSON.parse(savedValue!);
    const normalize = (booking: typeof expectedBooking) => ({
      ...booking,
      tickets: booking.tickets.sort((a, b) => a.type.localeCompare(b.type)),
    });

    expect(normalize(parsedBooking)).toEqual(normalize(expectedBooking));
    expect(window.alert).toHaveBeenCalledWith('Booking saved successfully!');
  });
});
