import Loading from '@/components/Loading';
import { render, screen } from '@testing-library/react';

describe('Loading', () => {
  it('Should render', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeDefined();
  });
});
