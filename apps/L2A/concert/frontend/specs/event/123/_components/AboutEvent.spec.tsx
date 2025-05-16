import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AboutEvent, { formatTime, renderDateTime, renderVenue, renderArtists, renderSchedule } from '@/app/event/[id]/_components/AboutEvent';

jest.mock('@/app/_utils/format-date', () => ({
  __esModule: true,
  default: jest.fn(() => 'FormattedDate'),
}));

describe('AboutEvent helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatTime()', () => {
    test('returns “Тодорхойгүй” for invalid input', () => {
      expect(formatTime(undefined)).toBe('Тодорхойгүй');
      expect(formatTime('not-a-number')).toBe('Тодорхойгүй');
      expect(formatTime(NaN)).toBe('Тодорхойгүй');
      expect(formatTime('Infinity')).toBe('Тодорхойгүй');
    });

    test('formats valid ms timestamp to HH:MM in local time', () => {
      const ms = 3_600_000;
      const d = new Date(ms);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      expect(formatTime(ms)).toBe(`${hh}:${mm}`);
    });
  });

  describe('renderDateTime()', () => {
    test('renders date and time with icons', () => {
      const { container } = render(renderDateTime('2025-01-02', '18:30'));
      expect(container.querySelectorAll('svg').length).toBe(2);
      expect(screen.getByText('FormattedDate')).toBeInTheDocument();
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });
  });

  describe('renderVenue()', () => {
    test('renders venue name', () => {
      render(renderVenue('My Venue'));
      expect(screen.getByText('My Venue')).toBeInTheDocument();
    });

    test('shows fallback when venue is missing', () => {
      render(renderVenue(undefined));
      expect(screen.getByText('Venue not available')).toBeInTheDocument();
    });
  });

  describe('renderArtists()', () => {
    test('lists artists', () => {
      render(renderArtists('Artist A', 'Artist B'));
      expect(screen.getByText('Artist A')).toBeInTheDocument();
      expect(screen.getByText('Artist B')).toBeInTheDocument();
    });

    test('shows fallback when no artists provided', () => {
      render(renderArtists(undefined, undefined));
      expect(screen.getByText('No artists listed')).toBeInTheDocument();
    });
  });

  describe('renderSchedule()', () => {
    test('formats door open time < 1000', () => {
      render(renderSchedule('120', '18:30'));
      expect(screen.getByText(/120 цагийн өмнө/)).toBeInTheDocument();
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    test('shows raw doorOpen if >= 1000 or non-numeric', () => {
      render(renderSchedule('1500', '20:00'));
      expect(screen.getByText('1500')).toBeInTheDocument();
    });

    test('renders fallback label when musicStart missing', () => {
      render(renderSchedule('120'));
      expect(screen.getByText(/Music start:/)).toBeInTheDocument();
    });
  });
});

describe('AboutEvent component', () => {
  const mockEvent = {
    endDate: '2025-01-01',
    musicStart: '18:00',
    doorOpen: '120',
    venue: { name: 'VenueName' },
    artistName: 'Artist A',
    specialGuestName: 'Artist B',
    seatData: [],
  } as any;

  test('shows error when endDate is missing', () => {
    render(<AboutEvent eventData={{ ...mockEvent, endDate: undefined }} />);
    expect(screen.getByText(/Missing required event date/)).toBeInTheDocument();
  });

  test('renders full layout correctly', () => {
    render(<AboutEvent eventData={mockEvent} />);
    expect(screen.getByText('FormattedDate')).toBeInTheDocument();
    const times = screen.getAllByText('18:00');
    expect(times.length).toBe(2);
    expect(screen.getByText('VenueName')).toBeInTheDocument();
    expect(screen.getByText('Artist A')).toBeInTheDocument();
    expect(screen.getByText('Artist B')).toBeInTheDocument();
    expect(screen.getByText(/120 цагийн өмнө/)).toBeInTheDocument();
    expect(screen.getByTestId('stadium-map-svg')).toBeInTheDocument();
  });

  test('renders “No artists listed” if none provided', () => {
    const modified = {
      ...mockEvent,
      artistName: undefined,
      specialGuestName: undefined,
    };
    render(<AboutEvent eventData={modified} />);
    expect(screen.getByText('No artists listed')).toBeInTheDocument();
  });
});
