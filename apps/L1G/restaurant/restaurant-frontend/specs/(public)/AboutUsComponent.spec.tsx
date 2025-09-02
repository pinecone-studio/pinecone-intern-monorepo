import AboutUsComponent from '@/components/sheets/AboutUsComponent';
import { render } from '@testing-library/react';

describe('aboutus page', () => {
  it('should render the AboutUsComponent', () => {
    render(<AboutUsComponent />);
  });
});
