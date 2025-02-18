import { Order } from '@/components/userProfile/OrderDat';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';

describe('orderData commponent', () => {
  it('render the orderData ', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <Order></Order>
      </MockedProvider>
    );

    const orderData = getByTestId('user-data');

    fireEvent.click(orderData);

    expect(orderData).toBeDefined();
  });
  it('render the orderHistory', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <Order></Order>
      </MockedProvider>
    );

    const orderHistory = getByTestId('order-history');

    await act(async () => {
      fireEvent.click(orderHistory);
    });

    expect(orderHistory).toBeDefined();
  });
  it('render the  update password', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <Order></Order>
      </MockedProvider>
    );

    const passwordProceed = getByTestId('password-proceed');

    await act(async () => {
      fireEvent.click(passwordProceed);
    });

    expect(passwordProceed).toBeDefined();
  });
});
