import { DetailHero } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('DetailHero', () => {
  it('should render DetailHero successfully', async () => {
    render(<DetailHero />);
  });
});
