import React from 'react';

interface ChevronIconProps extends React.SVGProps<SVGSVGElement> {
  direction?: 'up' | 'down';
}

const ChevronIcon = ({ direction = 'down', ...props }: ChevronIconProps) => {
  const path = direction === 'down' ? 'M19 9l-7 7-7-7' : 'M19 15l-7-7-7 7';
  return (
    <svg data-testid="chevron-icon" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
};

export default ChevronIcon;
