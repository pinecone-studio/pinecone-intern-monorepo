import { OrderHistory } from '@/components/UserProfile/OrderHistory';
import { act, fireEvent, render } from '@testing-library/react';

describe('orderHistory', () => {
  it('delete-button daraagvi baih vy', async () => {
    render(<OrderHistory></OrderHistory>);
  });
  it('delete button darah vy', async () => {
    const { getByTestId } = render(<OrderHistory></OrderHistory>);

    await act(async () => {
      fireEvent.click(getByTestId('open-modal-button'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('delete-button'));
    });

    const sendRequest = getByTestId('send-delete-request');

    expect(sendRequest).toBeDefined();
  });
});
