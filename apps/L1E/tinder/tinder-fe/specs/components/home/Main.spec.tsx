import Home from '@/components/home/Home';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('should render return', () => {
    render(<Home />);
    expect(screen.getByText('Main'));
  });
});
