import HeroComponent from '@/components/detailComponent/HeroComponent';
import { render } from '@testing-library/react';

describe('Test', () => {
  it('should renderr component', () => {
    render(<HeroComponent />);
  });
});
