import { FooterSmall } from '@/components/user/booking-page/FooterSmall';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked', () => {
  it('should render FooterSmall  successfully', async () => {
    render(<FooterSmall />);
  });
});
