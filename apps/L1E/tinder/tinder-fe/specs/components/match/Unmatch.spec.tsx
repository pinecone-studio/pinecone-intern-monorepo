import { UnMatch } from '@/components/match/UnMatch';
import { render } from '@testing-library/react';

describe('No Matches Yet page', () => {
  it('should render success', () => {
    render(<UnMatch />);
  });
});
