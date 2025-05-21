'use client';

import React, { FC, useState } from 'react';
import { Concert } from '@/generated';

type StadiumMapProps = {
  eventData: Concert;
  selectedDay?: string;
};

type ZoneType = {
  id: string;
  type: 'VIP' | 'Standard' | 'Backseat' | 'Outer';
  innerRadius: number;
  outerRadius: number;
  angleStart: number;
  angleEnd: number;
};

const zoneShapes: ZoneType[] = [
  { id: 'vip-0-90', type: 'VIP', innerRadius: 50, outerRadius: 80, angleStart: 0, angleEnd: 90 },
  { id: 'vip-90-180', type: 'VIP', innerRadius: 50, outerRadius: 80, angleStart: 90, angleEnd: 180 },
  { id: 'vip-180-270', type: 'VIP', innerRadius: 50, outerRadius: 80, angleStart: 180, angleEnd: 270 },
  { id: 'vip-270-360', type: 'VIP', innerRadius: 50, outerRadius: 80, angleStart: 270, angleEnd: 360 },
  { id: 'std-0-60', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 0, angleEnd: 60 },
  { id: 'std-60-120', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 60, angleEnd: 120 },
  { id: 'std-120-180', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 120, angleEnd: 180 },
  { id: 'std-180-240', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 180, angleEnd: 240 },
  { id: 'std-240-300', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 240, angleEnd: 300 },
  { id: 'std-300-360', type: 'Standard', innerRadius: 80, outerRadius: 110, angleStart: 300, angleEnd: 360 },
  { id: 'back-180-270', type: 'Backseat', innerRadius: 110, outerRadius: 140, angleStart: 180, angleEnd: 270 },
  { id: 'back-270-360', type: 'Backseat', innerRadius: 110, outerRadius: 140, angleStart: 270, angleEnd: 360 },
];

export const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

export const buildArc = (innerR: number, outerR: number, startA: number, endA: number) => {
  const so = polarToCartesian(0, 0, outerR, endA);
  const eo = polarToCartesian(0, 0, outerR, startA);
  const si = polarToCartesian(0, 0, innerR, startA);
  const ei = polarToCartesian(0, 0, innerR, endA);
  const largeArc = endA - startA > 180 ? 1 : 0;
  return `M ${so.x} ${so.y} A ${outerR} ${outerR} 0 ${largeArc} 0 ${eo.x} ${eo.y} L ${si.x} ${si.y} A ${innerR} ${innerR} 0 ${largeArc} 1 ${ei.x} ${ei.y} Z`;
};

export function useStadiumZones(eventData: Concert, day?: string) {
  const [selected, setSelected] = useState<string | null>(null);
  const seatArray = eventData?.seatData ?? [];
  const seatEntry = seatArray.find((d) => d?.date === day) || seatArray[0] || null;
  return { zones: zoneShapes, seatEntry, selected, setSelected };
}

export const getSeatBlock = (seatEntry: StadiumMapProps['eventData']['seatData'][0] | undefined, type: ZoneType['type']) => {
  if (!seatEntry) return null;
  switch (type) {
    case 'VIP':
      return seatEntry.seats.VIP;
    case 'Standard':
      return seatEntry.seats.Standard;
    case 'Backseat':
      return seatEntry.seats.Backseat;
    default:
      return null;
  }
};

export const getFillColor = (block: { availableTickets: number } | null, type: ZoneType['type']) => {
  if (!block || block.availableTickets <= 0) {
    return '#444';
  }
  const colorMap: Record<ZoneType['type'], string> = {
    VIP: '#FFD700',
    Standard: '#87CEFA',
    Backseat: '#FF6347',
    Outer: '#98FB98',
  };
  return colorMap[type];
};

const ZoneSlice: FC<{ z: ZoneType; seatEntry?: Concert['seatData'][0]; onSelect: (_id: string) => void }> = ({ z, seatEntry, onSelect }) => {
  const block = getSeatBlock(seatEntry, z.type);
  const fill = getFillColor(block, z.type);

  return <path d={buildArc(z.innerRadius, z.outerRadius, z.angleStart, z.angleEnd)} fill={fill} stroke="#000" strokeWidth={1} onClick={() => onSelect(z.id)} style={{ cursor: 'pointer' }} />;
};

const StadiumMap: FC<StadiumMapProps> = ({ eventData, selectedDay }) => {
  const { zones, seatEntry, selected, setSelected } = useStadiumZones(eventData, selectedDay);

  return (
    <div className="text-black">
      <svg width={400} height={400} viewBox="0 0 400 400" data-testid="stadium-map-svg">
        <g transform="translate(200,200)">
          <rect x={-60} y={-30} width={120} height={60} rx={8} fill="#222" />
          {zones.map((z) => (
            <ZoneSlice key={z.id} z={z} seatEntry={seatEntry} onSelect={setSelected} />
          ))}
        </g>
      </svg>
      {selected && <p className="mt-2 text-lg font-semibold text-white">Сонгосон хэсэг: {selected}</p>}
    </div>
  );
};

export default StadiumMap;
