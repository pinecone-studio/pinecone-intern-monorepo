import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { updateDiscountErrorMock, updateDiscountMock } from 'specs/utils/FoodMockData';
import { DiscountUpdateDialog } from '@/components/admin';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockDataProps = {
  discountId: '2',
  discountName: 'Test',
  discountRate: 20,
  startDate: '1756425600000',
  endDate: '1756512000000',
  refetch: jest.fn(),
};

describe('DiscountUpdateDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateDiscountMock]} addTypename={false}>
        <DiscountUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('discount-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should update discount and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateDiscountMock]} addTypename={false}>
        <DiscountUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    await waitFor(() => {
      expect(getByTestId('discount-update-dialog-title')).toBeInTheDocument();
    });

    const nameInput = getByTestId('discount-update-name-input');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    const submitButton = getByTestId('discount-update-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('discount-update-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хямдрал амжилттай шинэчлэгдлээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 4000 }
    );
  });

  it('should show toast error when update mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateDiscountErrorMock]} addTypename={false}>
        <DiscountUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('discount-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const nameInput = getByTestId('discount-update-name-input');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    const submitButton = getByTestId('discount-update-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('discount-update-dialog-title')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Хямдрал шинэчлэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
