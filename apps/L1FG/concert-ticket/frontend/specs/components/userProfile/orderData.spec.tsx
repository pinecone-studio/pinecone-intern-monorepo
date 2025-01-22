import { Order } from '@/components/userProfile/OrderData';
import { act, fireEvent, render } from '@testing-library/react';

describe('orderData commponent', () => {
  it('render the orderData ', async () => {
    const { getByTestId } = render(<Order></Order>);
    const orderData = getByTestId('user-data');
    fireEvent.click(orderData);
    expect(orderData).toBeDefined();
  });
  it('render the orderHistory', async () => {
    const { getByTestId } = render(<Order></Order>);
    const orderHistory = getByTestId('order-history');
    await act(async () => {
      fireEvent.click(orderHistory);
    });
    expect(orderHistory).toBeDefined();
  });
  it('render the  new password', async () => {
    const { getByTestId } = render(<Order></Order>);
    const passwordProceed = getByTestId('password-proceed');
    await act(async () => {
      fireEvent.click(passwordProceed);
    });
    expect(passwordProceed).toBeDefined();
  });
});
