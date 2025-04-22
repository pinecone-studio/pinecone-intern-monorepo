import { render } from '@testing-library/react';
import Footer from '../src/app/_components/Footer';

describe('Footer', () => {
  it('renders footer', () => {
    render(<Footer />);
  });
});
