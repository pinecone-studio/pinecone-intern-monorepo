import Footer from '@/app/_components/Footer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('footer components', () => {
  it('render the footer image', () => {
    render(<Footer />);
    const image = screen.getByAltText('footer-image');
    expect(image).toBeInTheDocument();
  });
  it('renders the copyright text', () => {
    render(<Footer />);
    const text = screen.getByText('© Copyright 2024');
    expect(text).toBeInTheDocument();
  });
});
