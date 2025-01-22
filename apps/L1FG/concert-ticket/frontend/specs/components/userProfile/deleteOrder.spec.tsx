import { DeleteButton } from '@/components/userProfile/OrderDelete';
import { render } from '@testing-library/react';

const setSendRequest = jest.fn();
describe('deleteOrder', () => {
  it('render delete order button', async () => {
    render(<DeleteButton onclick={() => setSendRequest(true)}></DeleteButton>);
  });
});
