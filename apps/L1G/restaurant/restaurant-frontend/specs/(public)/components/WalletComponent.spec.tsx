import { WalletComponent } from '@/components/WalletComponent';
import { render } from '@testing-library/react';

describe('wallet page', () => {
  it('should render the WalletComponent', () => {
    render(<WalletComponent />);
  });
});
