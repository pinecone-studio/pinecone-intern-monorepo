import { CheckoutFooter } from '@/features/user/check-out/CheckoutFooter';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Check out footer shuold render', () => {
  it('should footer render ', () => {
    render(<CheckoutFooter />);
  });
});
