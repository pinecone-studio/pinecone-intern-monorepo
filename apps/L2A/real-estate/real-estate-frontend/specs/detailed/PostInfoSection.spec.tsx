import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostInfoSection from '@/app/detailed/_components/PostInfoSection'; 
import { InfoItem } from '@/lib/typescripts';
import { User, Phone } from 'lucide-react';

describe('PostInfoSection', () => {
  const baseItems: InfoItem[] = [
    { icon: User, label: 'Эзэмшигч', value: 'John Doe' },
    { icon: Phone, label: 'Утас', value: '99112233' },
  ];

  it('renders all items with label and value', () => {
    const { container } = render(<PostInfoSection items={baseItems} />);

    baseItems.forEach(({ label, value }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(value as string)).toBeInTheDocument();
    });

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('renders "-" when value is null or undefined', () => {
    const itemsWithEmpty: InfoItem[] = [
      { icon: User, label: 'Нэр', value: undefined },
      { icon: Phone, label: 'Утас', value: null as any },
    ];

    render(<PostInfoSection items={itemsWithEmpty} />);
    expect(screen.getAllByText('-')).toHaveLength(2);
  });

  it('has data-testid="info-section"', () => {
    render(<PostInfoSection items={baseItems} />);
    expect(screen.getByTestId('info-section')).toBeInTheDocument();
  });
});
