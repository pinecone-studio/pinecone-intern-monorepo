import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestInfoRight } from '@/components/admin/ui';

describe('GuestInfoRight', () => {
  it('renders GuestInfoRight successfully', () => {
    render(<GuestInfoRight />);
  });
});
