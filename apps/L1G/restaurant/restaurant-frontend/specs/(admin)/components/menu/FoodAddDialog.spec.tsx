/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { Food } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { addFoodToCategoryErrorMock, addFoodToCategoryMock, addFoodToDiscountErrorMock, addFoodToDiscountMock } from 'specs/utils/MenuMockData';
import { toast } from 'sonner';
import { FoodAddDialog } from '@/components/admin/menu/FoodAddDialog';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockDataPropsCategory = {
  type: 'category',
  activeMenu: '1',
  filteredData: [
    {
      foodId: '1',
      foodName: 'Test1',
      price: '20000',
      foodStatus: 'Идэвхитэй',
      image: 'https://example.com/foodimage.jpg',
      category: null,
    },
    {
      foodId: '2',
      foodName: 'Test2',
      price: '20000',
      foodStatus: 'Идэвхитэй',
      image: 'https://example.com/foodimage.jpg',
      category: null,
    },
  ] as Food[],
  refetchCategories: jest.fn(),
  refetchDiscounts: jest.fn(),
};

const mockDataPropsDiscount = {
  type: 'discount',
  activeMenu: '1',
  filteredData: [
    {
      foodId: '1',
      foodName: 'Test1',
      price: '20000',
      foodStatus: 'Идэвхитэй',
      image: 'https://example.com/foodimage.jpg',
      discount: null,
    },
    {
      foodId: '2',
      foodName: 'Test2',
      price: '20000',
      foodStatus: 'Идэвхитэй',
      image: 'https://example.com/foodimage.jpg',
      discount: null,
    },
  ] as Food[],
  refetchCategories: jest.fn(),
  refetchDiscounts: jest.fn(),
};

describe('FoodAddDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[addFoodToCategoryMock]}>
        <FoodAddDialog {...mockDataPropsCategory} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should display check icon when food is selected', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[addFoodToCategoryMock]}>
        <FoodAddDialog {...mockDataPropsCategory} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    const selectTrigger = getByTestId('food-add-select-trigger');
    fireEvent.click(selectTrigger);

    const option1 = getByTestId('food-add-option-1');
    fireEvent.click(option1);

    fireEvent.click(selectTrigger);
    const checkIcon = getByTestId('select-food-check');
    expect(checkIcon).toBeInTheDocument();
  });

  it('should add food to category and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[addFoodToCategoryMock]}>
        <FoodAddDialog {...mockDataPropsCategory} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const selectTrigger = getByTestId('food-add-select-trigger');
    fireEvent.click(selectTrigger);

    expect(queryByTestId('food-add-option-1')).toBeInTheDocument();
    const selectFood = getByTestId('food-add-option-1');
    fireEvent.click(selectFood);

    const submitButton = getByTestId('food-add-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Хоол цэсэнд нэмэгдлээ!', {
        position: 'bottom-right',
      });
    });
  });

  it('should toast error when add food category mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[addFoodToCategoryErrorMock]}>
        <FoodAddDialog {...mockDataPropsCategory} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const selectTrigger = getByTestId('food-add-select-trigger');
    fireEvent.click(selectTrigger);

    expect(queryByTestId('food-add-option-1')).toBeInTheDocument();
    const selectFood = getByTestId('food-add-option-1');
    fireEvent.click(selectFood);

    const submitButton = getByTestId('food-add-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хоол нэмэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should add food to discount and show toast success', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[addFoodToDiscountMock]}>
        <FoodAddDialog {...mockDataPropsDiscount} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const selectTrigger = getByTestId('food-add-select-trigger');
    fireEvent.click(selectTrigger);

    expect(queryByTestId('food-add-option-1')).toBeInTheDocument();
    const selectFood = getByTestId('food-add-option-1');
    fireEvent.click(selectFood);

    const submitButton = getByTestId('food-add-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Хоол цэсэнд нэмэгдлээ!', {
        position: 'bottom-right',
      });
    });
  });

  it('should toast error when add food discount mutation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[addFoodToDiscountErrorMock]}>
        <FoodAddDialog {...mockDataPropsDiscount} />
      </MockedProvider>
    );

    const dialogTrigger = getByTestId('food-add-dialog-trigger');
    expect(dialogTrigger).toBeInTheDocument();
    fireEvent.click(dialogTrigger);

    const dialogTitle = getByTestId('food-add-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const selectTrigger = getByTestId('food-add-select-trigger');
    fireEvent.click(selectTrigger);

    expect(queryByTestId('food-add-option-1')).toBeInTheDocument();
    const selectFood = getByTestId('food-add-option-1');
    fireEvent.click(selectFood);

    const submitButton = getByTestId('food-add-submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хоол нэмэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });
});
