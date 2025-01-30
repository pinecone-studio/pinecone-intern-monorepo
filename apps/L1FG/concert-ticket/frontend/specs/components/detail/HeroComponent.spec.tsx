import HeroComponent from '@/components/detail/HeroComponent';
import { render } from '@testing-library/react';

describe('Test', () => {
  it('should renderr component', () => {
    render(<HeroComponent />);
  });
});
