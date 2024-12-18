import Matches from '@/components/Matches';
import { render, screen } from '@testing-library/react';

describe('Matches', () => {
  it('should render matches', () => {
    render(<Matches />);
  });
});
