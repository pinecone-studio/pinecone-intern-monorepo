import Main from '@/components/home/Main';
import { render, screen } from '@testing-library/react';

describe('Main', () => {
  it('should render return', () => {
    render(<Main />);
    expect(screen.getByText('Main'));
  });
});
