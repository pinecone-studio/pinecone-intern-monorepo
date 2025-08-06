import AboutUsComponent from '@/components/AboutUsComponent';
import { render } from '@testing-library/react';

describe('aboutus page', () => {
  it('should render the AboutUsComponent', () => {
    render(<AboutUsComponent />);
  });
});
