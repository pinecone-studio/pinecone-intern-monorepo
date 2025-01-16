import HeroComponent from '@/components/providers/Detail/HeroComponent';
import { render } from '@testing-library/react';

describe('Test', () => {
  it('should renderr component', () => {
    render(<HeroComponent />);
  });
});
