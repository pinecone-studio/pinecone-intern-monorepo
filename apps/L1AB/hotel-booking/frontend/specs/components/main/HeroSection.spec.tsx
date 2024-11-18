import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HeroSection } from '@/components/main';

describe('Main Hero Section', () => {
  it('should render the main hero section', () => {
    render(<HeroSection />);
  });
});
