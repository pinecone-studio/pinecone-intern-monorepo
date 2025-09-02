/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getCategoriesErrorMock, getCategoriesMock, getDiscountsErrorMock, getDiscountsMock, getFoodsMock } from 'specs/utils/FoodMockData';
import { MenuProductCard } from '@/components/admin';

describe('MenuProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, getDiscountsMock, getFoodsMock]}>
        <MenuProductCard />
      </MockedProvider>
    );
    const card = getByTestId('menu-product-card');
    expect(card).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('menu-title-list')).toBeInTheDocument();
    });

    const category = getByTestId('category-button-1');
    const discount = getByTestId('discount-button-1');

    expect(category).toBeInTheDocument();
    expect(discount).toBeInTheDocument();
  });

  it('should set active menu when category button is clicked', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, getDiscountsMock]}>
        <MenuProductCard />
      </MockedProvider>
    );
    const card = getByTestId('menu-product-card');
    expect(card).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('menu-title-list')).toBeInTheDocument();
    });

    const category1 = getByTestId('category-button-1');
    fireEvent.click(category1);
    expect(category1).toHaveClass('border-b-[#09090B]');
  });

  it('should change active menu when button is clicked', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock, getDiscountsMock]}>
        <MenuProductCard />
      </MockedProvider>
    );
    const card = getByTestId('menu-product-card');
    expect(card).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('menu-title-list')).toBeInTheDocument();
    });

    const discount1 = getByTestId('discount-button-1');
    fireEvent.click(discount1);
    expect(discount1).toHaveClass('border-b-[#09090B]');
  });

  it('should show error message when fetch queries fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getCategoriesErrorMock, getDiscountsErrorMock]}>
        <MenuProductCard />
      </MockedProvider>
    );

    const card = getByTestId('menu-product-card');
    expect(card).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('menu-product-error')).toBeInTheDocument();
    });
  });
});
