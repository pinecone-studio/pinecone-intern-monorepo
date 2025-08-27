import '@testing-library/jest-dom';
import { CategoryCreateDialog } from '@/components/admin/menu/CategoryCreateDialog';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { createCategoryErrorMock, createCategoryMock } from 'specs/utils/FoodMockData';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const mockDataProps = {
  refetch: jest.fn(),
};

describe('CategoryCreateDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createCategoryMock]} addTypename={false}>
        <CategoryCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent('Ангилал нэмэх');
  });

  it('should create new category and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[createCategoryMock]} addTypename={false}>
        <CategoryCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent('Ангилал нэмэх');

    const nameInput = getByTestId('cat-create-name-input');
    fireEvent.change(nameInput, { target: { value: 'Dessert' } });

    const submitButton = getByTestId('cat-create-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('cat-create-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Категори амжилттай үүслээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error when create mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[createCategoryErrorMock]} addTypename={false}>
        <CategoryCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('cat-create-dialog-open');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('cat-create-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent('Ангилал нэмэх');

    const nameInput = getByTestId('cat-create-name-input');
    fireEvent.change(nameInput, { target: { value: 'Dessert' } });

    const submitButton = getByTestId('cat-create-submit-button');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('cat-create-dialog-title')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Категори үүсгэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
