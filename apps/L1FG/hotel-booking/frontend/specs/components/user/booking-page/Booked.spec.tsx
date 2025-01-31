import { Booked } from '@/components/user/booking-page/Booked';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked', () => {
  it('should render Booked successfully', async () => {
    render(<Booked />);
  });
});
