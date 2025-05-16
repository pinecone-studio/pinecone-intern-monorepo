import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormatDate from '@/app/_utils/format-date';
import AboutEvent, { formatTime, renderDateTime, renderVenue, renderArtists, renderSchedule } from '@/app/event/[id]/_components/AboutEvent';

jest.mock('@/app/_utils/format-date', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AboutEvent helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatTime()', () => {
    test('returns “Тодорхойгүй” for no timestamp or invalid', () => {
      expect(formatTime(undefined)).toBe('Тодорхойгүй');
      expect(formatTime('not-a-number')).toBe('Тодорхойгүй');
      expect(formatTime(NaN)).toBe('Тодорхойгүй');
    });

    test('formats valid ms timestamp to HH:MM in local time', () => {
      const ms = 3_600_000;
      const d = new Date(ms);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      expect(formatTime(ms)).toBe(`${hh}:${mm}`);
    });

    test('returns “Тодорхойгүй” when Date(parsed) is invalid (e.g. Infinity)', () => {
      expect(formatTime('Infinity')).toBe('Тодорхойгүй');
    });
  });

  describe('renderDateTime()', () => {
    beforeEach(() => {
      (FormatDate as jest.Mock).mockReturnValue('FMT');
    });

    test('renders Calendar & Clock icons plus date and time', () => {
      const ms = 7_200_000;
      const d = new Date(ms);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');

      const { container } = render(renderDateTime('2025-01-02', ms));
      expect(container.querySelectorAll('svg').length).toBe(2);
      expect(screen.getByText('FMT')).toBeInTheDocument();
      expect(screen.getByText(`${hh}:${mm}`)).toBeInTheDocument();
      expect(FormatDate).toHaveBeenCalledWith('2025-01-02');
    });
  });

  describe('renderVenue()', () => {
    test('shows provided name', () => {
      render(renderVenue('MyPlace'));
      expect(screen.getByText('MyPlace')).toBeInTheDocument();
    });

    test('falls back when no name', () => {
      render(renderVenue(undefined));
      expect(screen.getByText('Venue not available')).toBeInTheDocument();
    });
  });

  describe('renderArtists()', () => {
    test('lists both artists', () => {
      render(renderArtists('A', 'B'));
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });

    test('falls back to “No artists listed”', () => {
      render(renderArtists(undefined, undefined));
      expect(screen.getByText('No artists listed')).toBeInTheDocument();
    });
  });

  describe('renderSchedule()', () => {
    test('renders “Door open” with hours-ago when numeric < 1000', () => {
      render(renderSchedule('120', undefined));
      expect(screen.getByText(/120 цагийн өмнө/)).toBeInTheDocument();
    });

    test('renders “Door open” as-is when number >= 1000 or non-numeric', () => {
      render(renderSchedule('2048', undefined));
      expect(screen.getByText('2048')).toBeInTheDocument();

      render(renderSchedule('NotANumber', undefined));
      expect(screen.getByText('NotANumber')).toBeInTheDocument();
    });

    test('renders “Music start” as string if string passed', () => {
      render(renderSchedule(undefined, '18:00'));
      expect(screen.getByText('18:00')).toBeInTheDocument();
    });

    test('renders “Music start” as number if number passed', () => {
      render(renderSchedule(undefined, 7200000));
      expect(screen.getByText('7200000')).toBeInTheDocument();
    });

    test('renders fallback label even if “Music start” undefined', () => {
      render(renderSchedule(undefined, undefined));
      expect(screen.getByText('Music start:')).toBeInTheDocument();
    });
  });
});

describe('AboutEvent component', () => {
  beforeEach(() => {
    (FormatDate as jest.Mock).mockReturnValue('Mock Date');
  });

  const baseProps = {
    endDate: '2025-01-01',
    musicStart: 3_600_000,
    doorOpen: '120',
    venue: { name: 'VenueName' },
    artistName: 'Artist A',
    specialGuestName: 'Artist B',
    seatData: [],
  } as any;

  test('shows error UI when endDate is missing', () => {
    render(<AboutEvent eventData={{ ...baseProps, endDate: undefined }} />);
    expect(screen.getByText('Error: Missing required event date')).toBeInTheDocument();
  });

  test('renders full layout when data is present', () => {
    render(<AboutEvent eventData={baseProps} />);
    expect(FormatDate).toHaveBeenCalledWith('2025-01-01');
    expect(screen.getAllByText(/\d{2}:\d{2}/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('VenueName')).toBeInTheDocument();
    expect(screen.getByText('Artist A')).toBeInTheDocument();
    expect(screen.getByText('Artist B')).toBeInTheDocument();
    expect(screen.getByText(/Door open:/)).toBeInTheDocument();
    expect(screen.getByText(/Music start:/)).toBeInTheDocument();
    expect(screen.getByTestId('stadium-map-svg')).toBeInTheDocument();
  });

  test('component shows “No artists listed” when no artists provided', () => {
    const props = {
      ...baseProps,
      artistName: undefined,
      specialGuestName: undefined,
    } as any;
    render(<AboutEvent eventData={props} />);
    expect(screen.getByText('No artists listed')).toBeInTheDocument();
  });
});
