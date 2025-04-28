import Footer from '@/app/_components/Footer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('should render Footer component', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
