import Footer from '@/components/main/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('should render nothing except text', () => {
    render(<Footer />);
    expect(screen.getByText('© Copyright 2024'));
  });
});
