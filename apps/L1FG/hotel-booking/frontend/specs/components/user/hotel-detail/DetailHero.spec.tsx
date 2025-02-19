import { DetailHero } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('DetailHero', () => {
  it('should render DetailHero successfully', async () => {
    render(<DetailHero />);
  });
});
