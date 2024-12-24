import Matches from '@/components/chat/Matches';
import { render } from '@testing-library/react';

describe('Matches', () => {
  it('should render matches', () => {
    render(<Matches />);
  });
});
