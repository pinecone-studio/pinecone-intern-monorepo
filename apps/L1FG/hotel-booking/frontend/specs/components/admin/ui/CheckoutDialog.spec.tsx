import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckoutDialog } from '@/components/admin/ui';

describe('CheckoutDialog', () => {
  it('renders CheckoutDialog successfully', () => {
    render(<CheckoutDialog />);
  });
});
