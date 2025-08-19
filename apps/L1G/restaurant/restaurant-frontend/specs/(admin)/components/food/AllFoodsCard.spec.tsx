import '@testing-library/jest-dom';
import { AllFoodsCard } from '@/components/admin/AllFoodsCard';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { deleteFoodByIdMock, deleteFoodErrorMock, deleteFoodWithIdErrorMock, getFoodsAfterDeleteMock, getFoodsErrorMock, getFoodsLoadingMock, getFoodsMock } from 'specs/utils/FoodsMockData';

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
      <MockedProvider mocks={[getFoodsMock, deleteFoodByIdMock]} addTypename={false}>
        <AllFoodsCard />
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

  it('should show error when getFoods fails', async () => {
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

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хоол амжилттай устгагдлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(queryByTestId('delete-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
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

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Хоол устгахад алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error when food id is not found', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getFoodsMock, deleteFoodWithIdErrorMock]} addTypename={false}>
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

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('1 кодтой хоол олдсонгүй!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
