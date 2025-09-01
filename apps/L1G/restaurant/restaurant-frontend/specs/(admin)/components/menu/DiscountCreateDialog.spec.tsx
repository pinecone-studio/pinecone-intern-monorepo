/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { DiscountCreateDialog } from '@/components/admin/menu/DiscountCreateDialog';
import { createDiscountErrorMock, createDiscountMock } from 'specs/utils/FoodMockData';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockDataProps = {
  refetch: jest.fn(),
};

describe('DiscountCreateDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createDiscountMock]}>
        <DiscountCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('discount-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent('Хямдрал нэмэх');
  });

  it('should create new discount and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[createDiscountMock]}>
        <DiscountCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);
    const dialogTitle = getByTestId('discount-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const nameInput = getByTestId('discount-create-name-input');
    const rateInput = getByTestId('discount-create-rate-input');
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(rateInput, { target: { value: 20 } });

    const selectDate = getByTestId('discount-create-select-date');

    fireEvent.click(selectDate);

    await waitFor(() => {
      expect(queryByTestId('discount-create-calendar')).toBeInTheDocument();
    });

    const calendar = getByTestId('discount-create-calendar');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDay = tomorrow.getDate().toString();

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const endDay = dayAfterTomorrow.getDate().toString();

    const startDateButton = Array.from(calendar.querySelectorAll('button')).find((btn) => btn.textContent?.trim() === startDay.toString() && !btn.disabled);
    if (startDateButton) {
      fireEvent.click(startDateButton);
    }

    const endDateButton = Array.from(calendar.querySelectorAll('button')).find((btn) => btn.textContent?.trim() === endDay.toString() && !btn.disabled);
    if (endDateButton) {
      fireEvent.click(endDateButton);
    }

    await waitFor(
      () => {
        expect(queryByTestId('discount-create-calendar')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const submitButton = getByTestId('discount-create-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('discount-create-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хямдрал амжилттай үүслээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error when create mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[createDiscountErrorMock]} addTypename={false}>
        <DiscountCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('discount-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('discount-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const nameInput = getByTestId('discount-create-name-input');
    const rateInput = getByTestId('discount-create-rate-input');
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(rateInput, { target: { value: 20 } });

    const selectDate = getByTestId('discount-create-select-date');
    fireEvent.click(selectDate);

    await waitFor(() => {
      expect(queryByTestId('discount-create-calendar')).toBeInTheDocument();
    });

    const calendar = getByTestId('discount-create-calendar');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startDay = tomorrow.getDate().toString();

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const endDay = dayAfterTomorrow.getDate().toString();

    const startDateButton = Array.from(calendar.querySelectorAll('button')).find((btn) => btn.textContent?.trim() === startDay.toString() && !btn.disabled);
    if (startDateButton) {
      fireEvent.click(startDateButton);
    }

    const endDateButton = Array.from(calendar.querySelectorAll('button')).find((btn) => btn.textContent?.trim() === endDay.toString() && !btn.disabled);
    if (endDateButton) {
      fireEvent.click(endDateButton);
    }

    await waitFor(
      () => {
        expect(queryByTestId('discount-create-calendar')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const submitButton = getByTestId('discount-create-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(queryByTestId('discount-create-dialog-title')).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Хямдрал үүсгэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
