import { render, screen } from '@testing-library/react';
import Footer from '../src/app/_components/Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('should render Footer component', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/2024 Booking Mongolia. All Rights Reserved./i)).toBeInTheDocument();
  });
});
