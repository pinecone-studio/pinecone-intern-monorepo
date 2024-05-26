import { TableHead } from '@/app/dashboard/_components/TableHead';
import { render } from '@testing-library/react';

describe('TableHead', () => {
  it('renders', () => {
    const { container } = render(<TableHead text={'text'} />);

    expect(container).toBeDefined();
  });
});
