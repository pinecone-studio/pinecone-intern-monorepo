import HeroSection from '@/app/_components/HeroSection';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HeroSection', () => {
  it('should render HeroSection component', () => {
    render(<HeroSection />);

    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
  });
});
