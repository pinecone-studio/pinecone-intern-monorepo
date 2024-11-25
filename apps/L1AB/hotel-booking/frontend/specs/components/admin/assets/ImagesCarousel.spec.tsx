import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ImagesCarousel } from '@/components/admin/assets';

describe('Admin Images Carousel', () => {
  it('should render the admin images carousel', () => {
    render(<ImagesCarousel />);
  });
});
