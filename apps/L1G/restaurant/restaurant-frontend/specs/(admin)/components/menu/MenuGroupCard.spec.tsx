import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { MenuGroupCard } from '@/components/admin';
import { getCategoriesMock, getDiscountsMock } from 'specs/utils/FoodMockData';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('AllFoodsCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, getDiscountsMock]} addTypename={false}>
        <MenuGroupCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('allfoods-food-list')).toBeInTheDocument();
    });
  });

  it('should show loading state initially', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getFoodsLoadingMock]} addTypename={false}>
        <AllFoodsCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    expect(queryByTestId('allfoods-loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('allfoods-loading')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByTestId('allfoods-food-list')).toBeInTheDocument();
    });
  });

  it('should show error message when getFoods fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getFoodsErrorMock]} addTypename={false}>
        <AllFoodsCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('allfoods-error')).toBeInTheDocument();
    });
  });

  it('should show error message when getFoods return empty array ', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getFoodsEmptyArrayMock]} addTypename={false}>
        <AllFoodsCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('allfoods-no-foods')).toBeInTheDocument();
    });
  });

  it('should delete food', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getFoodsMock, deleteFoodByIdMock, getFoodsAfterDeleteMock]} addTypename={false}>
        <AllFoodsCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('allfoods-food-list')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('delete-dialog-trigger-1');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Хоол амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    });

    await waitFor(() => {
      expect(queryByTestId('delete-dialog-title')).not.toBeInTheDocument();
    });
  });

  it('should show toast error when delete food fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getFoodsMock, deleteFoodErrorMock]} addTypename={false}>
        <AllFoodsCard />
      </MockedProvider>
    );

    const title = getByTestId('allfoods-title');
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('allfoods-food-list')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('delete-dialog-trigger-1');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хоол устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });
});
