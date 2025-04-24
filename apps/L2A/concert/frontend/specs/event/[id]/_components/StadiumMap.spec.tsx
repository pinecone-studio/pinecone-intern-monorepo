import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StadiumMap from '@/app/event/[id]/_components/StadiumMap';
import '@testing-library/jest-dom';

describe('StadiumMap Component', () => {
  const basicZones = [
    {
      id: 'test-zone',
      fill: '#000',
      type: 'Normal',
      angleStart: 0,
      angleEnd: 90,
    },
  ];

  it('renders the SVG element', () => {
    render(<StadiumMap zones={basicZones} />);
    const svg = screen.getByTestId('stadium-map-svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows selected zone info when a zone is clicked', () => {
    render(<StadiumMap zones={basicZones} />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    fireEvent.click(paths[0]);
    const output = screen.getByText(/Сонгосон хэсэг:/);
    expect(output).toBeInTheDocument();
  });

  it('updates text correctly when a different zone is clicked', () => {
    const twoZones = [
      { id: 'zone1', fill: '#000', type: 'Normal', angleStart: 0, angleEnd: 90 },
      { id: 'zone2', fill: '#000', type: 'Normal', angleStart: 90, angleEnd: 180 },
    ];
    render(<StadiumMap zones={twoZones} />);
    const paths = screen.getByTestId('stadium-map-svg').querySelectorAll('path');
    fireEvent.click(paths[0]);
    expect(screen.getByText(/Сонгосон хэсэг: zone1/)).toBeInTheDocument();
    fireEvent.click(paths[1]);
    expect(screen.getByText(/Сонгосон хэсэг: zone2/)).toBeInTheDocument();
  });

  it('uses the correct large-arc-flag in the path for angles > 180', () => {
    const largeArcZone = [
      {
        id: 'large-arc',
        fill: '#000',
        type: 'Normal',
        angleStart: 0,
        angleEnd: 270,
      },
    ];
    render(<StadiumMap zones={largeArcZone} />);
    const path = screen.getByTestId('stadium-map-svg').querySelector('path');
    const d = path?.getAttribute('d');
    expect(d).toMatch(/A \d+ \d+ 0 1 0/);
  });

  it('uses the correct large-arc-flag in the path for angles ≤ 180', () => {
    const smallArcZone = [
      {
        id: 'small-arc',
        fill: '#000',
        type: 'Normal',
        angleStart: 0,
        angleEnd: 90,
      },
    ];
    render(<StadiumMap zones={smallArcZone} />);
    const path = screen.getByTestId('stadium-map-svg').querySelector('path');
    const d = path?.getAttribute('d');
    expect(d).toMatch(/A \d+ \d+ 0 0 0/);
  });
});
