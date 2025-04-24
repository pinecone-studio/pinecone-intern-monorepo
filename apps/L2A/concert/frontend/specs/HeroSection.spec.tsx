import HeroSection from '@/app/_components/HeroSection';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HeroSection', () => {
  it('should render HeroSection', async () => {
    render(<HeroSection />);
  });
});
