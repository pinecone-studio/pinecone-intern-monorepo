import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Carousel from '@/components/carousel/Carousel';

import HomePage from '@/app/page';

jest.mock('@/components/header/Header', () => ({
  HeaderPart: jest.fn(() => <div data-testid="header-mock" />),
}));

jest.mock('@/components/carousel/Carousel', () => ({
  __esModule: true,
  default: jest.fn((_props) => <div data-testid="carousel-mock" />),
}));

jest.mock('@/components/ticketCard/Card', () => ({
  Card: jest.fn((_props) => <div data-testid="card-mock" />),
}));

jest.mock('@/app/footer/Footer', () => ({
  Footerr: jest.fn(() => <div data-testid="footer-mock" />),
}));

describe('HomePage Component', () => {
  it('renders all components correctly', () => {
    render(<HomePage />);

    // Check if all main components are rendered
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-mock')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-mock')).toHaveLength(2);
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });

  it('passes correct props to Carousel', () => {
    render(<HomePage />);

    // Verify Carousel receives slides
    expect(Carousel).toHaveBeenCalledWith(
      expect.objectContaining({
        slides: expect.any(Array),
      }),
      {}
    );
  });
});
