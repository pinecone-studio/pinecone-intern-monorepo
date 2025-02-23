import { Footer } from '@/components/profile/Footer';
import { render } from '@testing-library/react';

describe('Footer Component', () => {
  it('renders footer links correctly', () => {
    render(<Footer />);
  });
});
