'use client';

import React, { useState } from 'react';

type ZoneType = {
  id: string;
  fill: string;
  type: 'VIP' | 'Normal' | 'Back' | 'Outer';
  angleStart: number;
  angleEnd: number;
};

type StadiumMapProps = {
  zones?: ZoneType[];
};

const defaultZones: ZoneType[] = [
  { id: 'vip1', fill: '#FFD700', type: 'VIP', angleStart: 0, angleEnd: 45 },
  { id: 'vip2', fill: '#FFD700', type: 'VIP', angleStart: 45, angleEnd: 90 },
  { id: 'vip3', fill: '#FFD700', type: 'VIP', angleStart: 90, angleEnd: 135 },
  { id: 'vip4', fill: '#FFD700', type: 'VIP', angleStart: 135, angleEnd: 180 },
  { id: 'normal1', fill: '#87CEFA', type: 'Normal', angleStart: 0, angleEnd: 45 },
  { id: 'normal2', fill: '#87CEFA', type: 'Normal', angleStart: 45, angleEnd: 90 },
  { id: 'normal3', fill: '#87CEFA', type: 'Normal', angleStart: 90, angleEnd: 135 },
  { id: 'normal4', fill: '#87CEFA', type: 'Normal', angleStart: 135, angleEnd: 180 },
  { id: 'back1', fill: '#FF6347', type: 'Back', angleStart: 180, angleEnd: 225 },
  { id: 'back2', fill: '#FF6347', type: 'Back', angleStart: 225, angleEnd: 270 },
  { id: 'outer1', fill: '#98FB98', type: 'Outer', angleStart: 0, angleEnd: 15 },
  { id: 'outer2', fill: '#98FB98', type: 'Outer', angleStart: 15, angleEnd: 45 },
  { id: 'outer3', fill: '#98FB98', type: 'Outer', angleStart: 45, angleEnd: 90 },
  { id: 'outer4', fill: '#98FB98', type: 'Outer', angleStart: 90, angleEnd: 135 },
  { id: 'outer5', fill: '#98FB98', type: 'Outer', angleStart: 135, angleEnd: 180 },
  { id: 'outer6', fill: '#98FB98', type: 'Outer', angleStart: 180, angleEnd: 225 },
];

const StadiumMap: React.FC<StadiumMapProps> = ({ zones = defaultZones }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneClick = (id: string) => {
    setSelectedZone(id);
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const arcPath = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = polarToCartesian(x, y, innerRadius, startAngle);
    const endInner = polarToCartesian(x, y, innerRadius, endAngle);

    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
      'Z',
    ].join(' ');
  };

  return (
    <div className="text-black">
      <svg data-testid="stadium-map-svg" width="400" height="400" viewBox="0 0 400 400">
        <g transform="translate(200,200)">
          {zones.map((zone) => {
            const innerRadius = zone.type === 'VIP' ? 70 : zone.type === 'Normal' ? 90 : zone.type === 'Back' ? 110 : 130;
            const outerRadius = innerRadius + 20;

            return (
              <path
                key={zone.id}
                d={arcPath(0, 0, innerRadius, outerRadius, zone.angleStart, zone.angleEnd)}
                fill={zone.fill}
                stroke="#000"
                strokeWidth="1"
                onClick={() => handleZoneClick(zone.id)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </g>
      </svg>
      {selectedZone && <p className="mt-2 text-lg font-semibold">Сонгосон хэсэг: {selectedZone}</p>}
    </div>
  );
};

export default StadiumMap;
