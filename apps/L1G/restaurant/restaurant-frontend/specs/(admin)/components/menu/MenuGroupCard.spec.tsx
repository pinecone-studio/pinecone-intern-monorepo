/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import {
  getCategoriesMock,
  getDiscountsMock,
  deleteCategoryByIdMock,
  getCategoriesAfterDeleteMock,
  deleteDiscountByIdMock,
  getDiscountsAfterDeleteMock,
  deleteCategoryErrorMock,
  deleteDiscountErrorMock,
} from 'specs/utils/FoodMockData';
import { MenuGroupCard } from '@/components/admin/menu/MenuGroupCard';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('MenuGroupCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, getDiscountsMock]}>
        <MenuGroupCard />
      </MockedProvider>
    );

    const card = getByTestId('menu-group');
    expect(card).toBeInTheDocument();
  });

  it('should delete category', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, deleteCategoryByIdMock, getCategoriesAfterDeleteMock]} addTypename={false}>
        <MenuGroupCard />
      </MockedProvider>
    );
    const card = getByTestId('menu-group');
    expect(card).toBeInTheDocument();

    const tab = getByTestId('menu-group-tab');
    expect(tab).toBeInTheDocument();
    fireEvent.click(tab);

    await waitFor(() => {
      expect(getByTestId('menu-category-list-0')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('category-delete-dialog-trigger-0');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Цэсний ангилал амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should delete discount', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getDiscountsMock, deleteDiscountByIdMock, getDiscountsAfterDeleteMock]}>
        <MenuGroupCard />
      </MockedProvider>
    );

    const card = getByTestId('menu-group');
    expect(card).toBeInTheDocument();

    const tab = getByTestId('menu-group-tab');
    expect(tab).toBeInTheDocument();
    fireEvent.click(tab);

    await waitFor(() => {
      expect(getByTestId('menu-discount-list-0')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('discount-delete-dialog-trigger-0');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Хямдрал амжилттай устгагдлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should show toast error when delete category fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, deleteCategoryErrorMock]} addTypename={false}>
        <MenuGroupCard />
      </MockedProvider>
    );

    const card = getByTestId('menu-group');
    expect(card).toBeInTheDocument();

    const tab = getByTestId('menu-group-tab');
    expect(tab).toBeInTheDocument();
    fireEvent.click(tab);

    await waitFor(() => {
      expect(getByTestId('menu-category-list-0')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('category-delete-dialog-trigger-0');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Цэсний ангилал устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });

  it('should show toast error when delete discount fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getDiscountsMock, deleteDiscountErrorMock]} addTypename={false}>
        <MenuGroupCard />
      </MockedProvider>
    );

    const card = getByTestId('menu-group');
    expect(card).toBeInTheDocument();

    const tab = getByTestId('menu-group-tab');
    expect(tab).toBeInTheDocument();
    fireEvent.click(tab);

    await waitFor(() => {
      expect(getByTestId('menu-discount-list-0')).toBeInTheDocument();
    });

    const deleteDialogTrigger = getByTestId('discount-delete-dialog-trigger-0');
    expect(deleteDialogTrigger).toBeInTheDocument();
    fireEvent.click(deleteDialogTrigger);

    expect(getByTestId('delete-dialog-title')).toBeInTheDocument();

    expect(getByTestId('delete-dialog-delete-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('delete-dialog-delete-button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Хямдрал устгахад алдаа гарлаа!', {
        position: 'bottom-right',
      });
    });
  });
});
