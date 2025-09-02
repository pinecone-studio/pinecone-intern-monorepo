import { Navigation } from '@/components/Navigation';
import { render } from '@testing-library/react';

describe('aboutus page', () => {
  it('should render the Navigation', () => {
    render(<Navigation />);
  });
});
