import { Header } from '@/components/Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByAltText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Messages/i)).toBeInTheDocument();
  });
});
