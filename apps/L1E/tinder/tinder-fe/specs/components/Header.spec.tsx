import Header from '@/components/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should render nothing ', () => {
    render(<Header />);
    expect(screen.getByText('Create Account'));
  });
});
