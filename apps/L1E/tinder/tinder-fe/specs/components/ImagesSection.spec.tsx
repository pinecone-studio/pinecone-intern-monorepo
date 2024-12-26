import ImagesSection from '@/components/profile/ImagesSection';
import { render, screen } from '@testing-library/react';

describe('ImagesSection', () => {
  it('should render nothing expect text', () => {
    render(<ImagesSection />);
    expect(screen.getByText('Images Section'));
  });
});
