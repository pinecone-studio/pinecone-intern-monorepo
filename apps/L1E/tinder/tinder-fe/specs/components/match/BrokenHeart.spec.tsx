import { BrokenHeart } from '@/components/match/BrokenHeart';
import { render } from '@testing-library/react';

describe('Broken Heart Svg', () => {
  it('should render success', () => {
    render(<BrokenHeart />);
  });
});
