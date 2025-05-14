import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormatDate from '@/app/_utils/format-date';
import { extractFormattedDates } from '@/app/event/[id]/_components/ConcertBanner';
import ConcertBanner from '@/app/event/[id]/_components/ConcertBanner';

jest.mock('@/app/_utils/format-date', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('extractFormattedDates utility', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns empty array for undefined or empty seatData', () => {
    expect(extractFormattedDates(undefined)).toEqual([]);
    expect(extractFormattedDates([])).toEqual([]);
  });

  test('maps valid dates to MM.DD format', () => {
    (FormatDate as jest.Mock).mockImplementation((d) => d as string);
    const input = [{ date: '2025-12-05' }, { date: '2026-01-15' }];
    const result = extractFormattedDates(input as any);
    expect(result).toEqual(['12.05', '01.15']);
    expect(FormatDate).toHaveBeenCalledTimes(2);
  });

  test('propagates "Тодорхойгүй" when FormatDate returns that', () => {
    (FormatDate as jest.Mock).mockReturnValue('Тодорхойгүй');
    const input = [{ date: 'bad-date' }];
    const result = extractFormattedDates(input as any);
    expect(result).toEqual(['Тодорхойгүй']);
    expect(FormatDate).toHaveBeenCalledWith('bad-date');
  });

  test('returns "Invalid Date" if formatted string unexpected', () => {
    (FormatDate as jest.Mock).mockReturnValue('202501');
    const input = [{ date: 'whatever' }];
    const result = extractFormattedDates(input as any);
    expect(result).toEqual(['Invalid Date']);
  });
});

describe('ConcertBanner component', () => {
  beforeEach(() => jest.clearAllMocks());

  const baseEvent = {
    artistName: 'Cool Artist',
    title: 'Fun Show',
    seatData: [{ date: '2025-07-20' }],
  } as any;

  test('renders artist button and uppercase title', () => {
    (FormatDate as jest.Mock).mockReturnValue('2025-07-20');
    render(<ConcertBanner eventData={baseEvent} />);
    expect(screen.getByRole('button')).toHaveTextContent('Cool Artist');
    expect(screen.getByText('FUN SHOW')).toBeInTheDocument();
  });

  test('renders formatted date badges when dates available', () => {
    (FormatDate as jest.Mock).mockReturnValue('2025-07-20');
    render(<ConcertBanner eventData={baseEvent} />);
    expect(screen.getByText('07.20')).toBeInTheDocument();
  });

  test('shows fallback text when no dates available', () => {
    render(<ConcertBanner eventData={{ ...baseEvent, seatData: [] }} />);
    expect(screen.getByText('No dates available')).toBeInTheDocument();
  });

  test('uses default placeholders for missing artistName and title', () => {
    (FormatDate as jest.Mock).mockReturnValue('2025-08-15');
    render(<ConcertBanner eventData={{ seatData: [{ date: '2025-08-15' }] } as any} />);
    expect(screen.getByRole('button')).toHaveTextContent('Unknown Artist');
    expect(screen.getByText('UNTITLED EVENT')).toBeInTheDocument();
  });
});
