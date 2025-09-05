import { Navbar } from '@/components/Navbar';
import { render } from '@testing-library/react';

describe('Navbar', () => {
  it('should render the Navbar', () => {
    render(<Navbar />);
  });
});
