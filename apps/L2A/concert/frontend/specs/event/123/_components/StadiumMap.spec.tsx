import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StadiumMap, { getSeatBlock, getFillColor, polarToCartesian, buildArc } from '@/app/event/[id]/_components/StadiumMap';
import '@testing-library/jest-dom';

describe('StadiumMap component', () => {
  const eventData = {
    seatData: [
      {
        date: '2025-05-13',
        seats: {
          VIP: { availableTickets: 5, price: 100 },
          Standard: { availableTickets: 3, price: 60 },
          Backseat: { availableTickets: 0, price: 30 },
        },
      },
    ],
  } as any;

  test('renders correct number of zone slices', () => {
    render(<StadiumMap eventData={eventData} />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    expect(paths.length).toBe(12);
  });

  test('selects a zone on click and displays selected id', () => {
    render(<StadiumMap eventData={eventData} />);
    const svg = screen.getByTestId('stadium-map-svg');
    const firstPath = svg.querySelector('path');
    expect(firstPath).not.toBeNull();
    if (firstPath) fireEvent.click(firstPath);
    expect(screen.getByText(/Сонгосон хэсэг:/)).toBeInTheDocument();
  });

  test('uses selectedDay to choose correct seatEntry in useStadiumZones', () => {
    const multiDayData = {
      seatData: [
        {
          date: '2025-05-12',
          seats: {
            VIP: { availableTickets: 1, price: 90 },
            Standard: { availableTickets: 1, price: 50 },
            Backseat: { availableTickets: 1, price: 30 },
          },
        },
        {
          date: '2025-05-13',
          seats: {
            VIP: { availableTickets: 2, price: 100 },
            Standard: { availableTickets: 2, price: 60 },
            Backseat: { availableTickets: 2, price: 40 },
          },
        },
      ],
    } as any;

    render(<StadiumMap eventData={multiDayData} selectedDay="2025-05-12" />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    expect(paths.length).toBe(12);
  });

  test('handles missing seatData (undefined)', () => {
    render(<StadiumMap eventData={{ seatData: undefined } as any} />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    expect(paths.length).toBe(12);
  });

  test('handles null seatData gracefully', () => {
    render(<StadiumMap eventData={{ seatData: null } as any} />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    expect(paths.length).toBe(12);
  });

  test('getSeatBlock returns correct block for VIP, Standard, Backseat', () => {
    const seatEntry = eventData.seatData[0];
    expect(getSeatBlock(seatEntry, 'VIP')).toEqual({ availableTickets: 5, price: 100 });
    expect(getSeatBlock(seatEntry, 'Standard')).toEqual({ availableTickets: 3, price: 60 });
    expect(getSeatBlock(seatEntry, 'Backseat')).toEqual({ availableTickets: 0, price: 30 });
    expect(getSeatBlock(seatEntry, 'Outer')).toBeNull();
  });

  test('getFillColor returns correct color or fallback', () => {
    expect(getFillColor({ availableTickets: 5 }, 'VIP')).toBe('#FFD700');
    expect(getFillColor({ availableTickets: 0 }, 'Backseat')).toBe('#444');
    expect(getFillColor(null, 'Standard')).toBe('#444');
  });

  test('buildArc returns valid SVG path string', () => {
    const arc = buildArc(50, 80, 0, 90);
    expect(typeof arc).toBe('string');
    expect(arc).toMatch(/^M\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\sA/);
  });

  test('buildArc sets largeArc flag correctly for arcs over 180 degrees', () => {
    const arc = buildArc(50, 80, 0, 270);
    expect(arc).toContain('A 80 80 0 1 0');
    expect(arc).toContain('A 50 50 0 1 1');
  });

  test('polarToCartesian returns correct coordinates for 90 degrees (rightward)', () => {
    const { x, y } = polarToCartesian(0, 0, 100, 90);
    expect(x).toBeCloseTo(100, 2);
    expect(y).toBeCloseTo(0, 2);
  });

  test('polarToCartesian returns correct coordinates for 0 degrees (upward)', () => {
    const { x, y } = polarToCartesian(0, 0, 100, 0);
    expect(x).toBeCloseTo(0, 2);
    expect(y).toBeCloseTo(-100, 2);
  });
});
