import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestInfoLeft } from '@/components/admin/ui/GuestInfoLeft';

describe('GuestInfoLeft', () => {
  it('renders GuestInfoLeft successfully', () => {
    render(<GuestInfoLeft />);
  });
});
