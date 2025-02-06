import { PriceDetail } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('PriceDetail', () => {
  it('should render PriceDetail successfully', async () => {
    render(<PriceDetail />);
  });
});
