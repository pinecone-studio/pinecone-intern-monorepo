import { PriceDetail } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('PriceDetail', () => {
  it('should render PriceDetail successfully', async () => {
    render(<PriceDetail price={0} />);
  });
});
