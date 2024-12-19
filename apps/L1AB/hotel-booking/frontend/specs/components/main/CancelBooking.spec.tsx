import { CancelBookingDialog } from '@/components/main/CancelBookingDialog';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main CancelBooking', () => {
  it('should render the main CancelBooking', () => {
    render(<CancelBookingDialog />);
  });
});
