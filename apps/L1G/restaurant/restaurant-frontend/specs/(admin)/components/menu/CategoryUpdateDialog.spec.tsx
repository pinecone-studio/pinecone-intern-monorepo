import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { updateCategoryErrorMock, updateCategoryMock } from 'specs/utils/FoodMockData';
import { CategoryUpdateDialog } from '@/components/admin';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const mockDataProps = {
  categoryId: '2',
  categoryName: 'Test1',
  refetch: jest.fn(),
};

describe('CategoryUpdateDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateCategoryMock]} addTypename={false}>
        <CategoryUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should edit category and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateCategoryMock]} addTypename={false}>
        <CategoryUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const nameInput = getByTestId('cat-update-name-input');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(nameInput, { target: { value: 'Test1' } });

    const submitButton = getByTestId('cat-update-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('cat-update-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Категори амжилттай шинэчлэгдлээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error when update mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateCategoryErrorMock]} addTypename={false}>
        <CategoryUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-update-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const nameInput = getByTestId('cat-update-name-input');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(nameInput, { target: { value: 'Test1' } });

    const submitButton = getByTestId('cat-update-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('cat-update-dialog-title')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Категори шинэчлэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
