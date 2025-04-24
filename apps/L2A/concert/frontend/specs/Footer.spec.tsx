import { render, screen } from '@testing-library/react';
import Footer from '../src/app/_components/Footer';
import '@testing-library/jest-dom';


describe('Footer', () => {
  it('renders footer', () => {
    render(<Footer />);

    expect(screen.getByText(/2024 Booking Mongolia. All Rights Reserved./i)).toBeInTheDocument();
  });
});
