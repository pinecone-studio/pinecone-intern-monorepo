import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeatInfo, { DateSelector } from '@/app/event/[id]/_components/SeatInfo';

describe('SeatInfo component', () => {
  test('renders fallback when no seatData', () => {
    render(<SeatInfo eventData={{ seatData: [] } as any} />);
    expect(screen.getByText('No ticket information available')).toBeInTheDocument();
  });

  test('renders ticket options with zero counts and enables button', () => {
    const eventData = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {
            VIP: { availableTickets: 0, price: 100 },
            Standard: { availableTickets: 0, price: 50 },
            Backseat: { availableTickets: 0, price: 25 },
          },
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.getByText('Тоглолт үзэх өдрөө сонгоно уу.')).toBeInTheDocument();
    expect(screen.getByText('2025-05-13')).toBeInTheDocument();
    expect(screen.getByText('Арын тасалбар (0)')).toBeInTheDocument();
    expect(screen.getByText('Энгийн тасалбар (0)')).toBeInTheDocument();
    expect(screen.getByText('VIP тасалбар (0)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тасалбар захиалах/ })).toBeEnabled();
  });

  test('renders available tickets and enables button', () => {
    const eventData = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {
            VIP: { availableTickets: 1, price: 100 },
            Standard: { availableTickets: 2, price: 50 },
            Backseat: { availableTickets: 3, price: 25 },
          },
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.getByText('Арын тасалбар (3)')).toBeInTheDocument();
    expect(screen.getByText('Энгийн тасалбар (2)')).toBeInTheDocument();
    expect(screen.getByText('VIP тасалбар (1)')).toBeInTheDocument();
    expect(screen.getByText('25₮')).toBeInTheDocument();
    expect(screen.getByText('50₮')).toBeInTheDocument();
    expect(screen.getByText('100₮')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тасалбар захиалах/ })).toBeEnabled();
  });

  test('renders fallback when date is undefined and no valid tickets', () => {
    const eventData = {
      seatData: [
        {
          date: undefined,
          seats: {},
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.getByText('No ticket information available')).toBeInTheDocument();
  });

  test('renders fallback when valid seats exist but date is missing', () => {
    const eventData = {
      seatData: [
        {
          date: undefined,
          seats: {
            VIP: { availableTickets: 1, price: 100 },
          },
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.getByText('No ticket information available')).toBeInTheDocument();
  });

  test('does not show ticket type if price is missing', () => {
    const eventData = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {
            VIP: { availableTickets: 1 },
            Standard: { availableTickets: 2, price: 50 },
          },
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.queryByText('VIP тасалбар')).not.toBeInTheDocument();
    expect(screen.getByText('Энгийн тасалбар (2)')).toBeInTheDocument();
  });

  test('renders message when no ticket options are available', () => {
    const eventData = {
      seatData: [
        {
          date: '2025-05-13',
          seats: {},
        },
      ],
    } as any;

    render(<SeatInfo eventData={eventData} />);
    expect(screen.getByText('Энд тасалбарын сонголт байхгүй байна')).toBeInTheDocument();
  });
  test('renders "Боломжтой өдөр байхгүй" when DateSelector receives empty dates array', () => {
    render(<DateSelector dates={[]} selected={undefined} onChange={jest.fn()} />);
    expect(screen.getByText('Боломжтой өдөр байхгүй')).toBeInTheDocument();
  });
});
