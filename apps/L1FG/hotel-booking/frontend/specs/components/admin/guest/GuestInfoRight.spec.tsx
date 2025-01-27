import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestInfoRight } from '@/components/admin/guest/GuestInfoRight';

describe('CheckoutDialog', () => {
  it('renders CheckoutDialog successfully', () => {
    render(<GuestInfoRight />);
  });
});
