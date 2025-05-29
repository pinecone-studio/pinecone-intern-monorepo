import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostDetailsTable from '@/app/detailed/_components/PostDetailsTable'; 

describe('PostDetailsTable', () => {
  it('renders all label-value pairs correctly', () => {
    const details: [string, string | number | undefined][] = [
      ['Талбай', '120м²'],
      ['Өрөөний тоо', 3],
      ['Үнэ', '$100,000'],
    ];

    render(<PostDetailsTable details={details} />);

    details.forEach(([label, value]) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(String(value))).toBeInTheDocument();
    });
  });

  it('renders "-" when value is falsy (undefined, empty string, null)', () => {
    const details: [string, string | number | undefined][] = [
      ['Цонх', undefined],
      ['Шал', ''],
      ['Тагт', null as any],
    ];

    render(<PostDetailsTable details={details} />);
    expect(screen.getAllByText('-')).toHaveLength(3);
  });
});
