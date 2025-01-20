import Wallet from '@/components/order/Wallet';
import { render } from '@testing-library/react';
describe('Wallet', () => {
  it('wallet renders successfully', async () => {
    render(<Wallet/>);
  });
});
