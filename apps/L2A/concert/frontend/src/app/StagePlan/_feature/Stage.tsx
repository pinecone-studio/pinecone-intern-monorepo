'use client';
import RideSide from './RideSide';

const StagePlan = () => {
  const colors = ['#f2edf0', '#de5ba9', '#818cf8'];
  const rings = [
    { r1: 300, r2: 240, color: colors[0] },
    { r1: 220, r2: 160, color: colors[1] },
    { r1: 140, r2: 100, color: colors[2] },
  ];

  const sectors = 8;
  const centerX = 400;
  const centerY = 400;

  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const getPath = (r1: number, r2: number, startAngle: number, endAngle: number) => {
    const x1 = centerX + r1 * Math.cos(toRadians(startAngle));
    const y1 = centerY + r1 * Math.sin(toRadians(startAngle));
    const x2 = centerX + r1 * Math.cos(toRadians(endAngle));
    const y2 = centerY + r1 * Math.sin(toRadians(endAngle));

    const x3 = centerX + r2 * Math.cos(toRadians(endAngle));
    const y3 = centerY + r2 * Math.sin(toRadians(endAngle));
    const x4 = centerX + r2 * Math.cos(toRadians(startAngle));
    const y4 = centerY + r2 * Math.sin(toRadians(startAngle));

    return `
      M ${x1},${y1}
      A ${r1},${r1} 0 0,1 ${x2},${y2}
      L ${x3},${y3}
      A ${r2},${r2} 0 0,0 ${x4},${y4}
      Z
    `;
  };

  return (
    <div className="flex items-center">
      <svg viewBox="35 0 800 800" width="800" height="800">
        {rings.map((ring, ringIndex) =>
          [...Array(sectors)].map((_, i) => {
            const start = (360 / sectors) * i;
            const end = (360 / sectors) * (i + 1);
            if (start < 90 || start >= 270) return null;
            return <path key={`${ringIndex}-${i}`} d={getPath(ring.r1, ring.r2, start, end)} fill={ring.color} stroke="black" strokeWidth="4" />;
          })
        )}

        <g>
          <rect x="370" y="360" width="200" height="80" rx="20" fill="#171717" stroke="white" strokeWidth="4" />
          <text x="470" y="410" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
            ТАЙЗ
          </text>
        </g>
        <g fill="#D7D7D8" stroke="black" strokeWidth="4">
          <rect x="400" y="100" width="135" height="60" />
          <rect x="400" y="180" width="135" height="60" />
          <rect x="400" y="260" width="135" height="60" />
          <rect x="400" y="480" width="135" height="60" />
          <rect x="400" y="560" width="135" height="60" />
          <rect x="400" y="640" width="135" height="60" />
        </g>
        <g transform="translate(135, 0)">
          <RideSide />
        </g>
      </svg>
    </div>
  );
};

export default StagePlan;
