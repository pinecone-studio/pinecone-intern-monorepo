/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { SelectCategoryInput } from '@/components/admin';
import { GetCategoriesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import userEvent from '@testing-library/user-event';
import { formSchemaFood } from '@/helpers/form-schemas';

const getCategoriesMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  result: {
    data: {
      getCategories: [
        {
          categoryId: '1',
          categoryName: 'Dessert',
        },
        {
          categoryId: '2',
          categoryName: 'Coffee',
        },
      ],
    },
  },
};
const getCategoriesNullMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  result: {
    data: {
      getCategories: [],
    },
  },
};
const getCategoryNameNullMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  result: {
    data: {
      getCategories: [
        {
          categoryId: '1',
          categoryName: null,
        },
      ],
    },
  },
};
const getCategoriesLoadingMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  delay: 1000,
  result: {
    data: {
      getCategories: [
        {
          categoryId: '1',
          categoryName: 'Dessert',
        },
        {
          categoryId: '2',
          categoryName: 'Coffee',
        },
      ],
    },
  },
};
const getCategoriesErrorMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  error: new Error('Network error'),
};

const TestWrapper = () => {
  const methods = useForm<z.infer<typeof formSchemaFood>>();
  return (
    <FormProvider {...methods}>
      <SelectCategoryInput control={methods.control} />
    </FormProvider>
  );
};

describe('SelectCategoryInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[getCategoriesMock]} addTypename={false}>
        <TestWrapper />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('create-food-category-select')).toBeInTheDocument();
    });

    const categorySelect = getByTestId('create-food-category-select');
    await userEvent.click(categorySelect);

    await waitFor(() => {
      expect(getByTestId('create-food-category-dropdown')).toBeInTheDocument();
    });

    const categoryOption1 = getByTestId('create-food-category-option-1');
    const categoryOption2 = getByTestId('create-food-category-option-2');

    expect(categoryOption1).toHaveTextContent('Dessert');
    expect(categoryOption2).toHaveTextContent('Coffee');

    await userEvent.click(categoryOption1);

    expect(queryByTestId('create-food-category-dropdown')).not.toBeInTheDocument();
    expect(categorySelect).toHaveTextContent('Dessert');
  });

  it('should display "Категори" text when getCategories fetched data is null', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoryNameNullMock]} addTypename={false}>
        <TestWrapper />
      </MockedProvider>
    );
    await waitFor(() => expect(getByTestId('create-food-category-select')).not.toHaveTextContent('Loading...'));

    fireEvent.click(getByTestId('create-food-category-select'));
    await waitFor(() => getByTestId('create-food-category-option-1'));

    fireEvent.click(getByTestId('create-food-category-option-1'));

    await waitFor(() => expect(getByTestId('create-food-category-select')).toHaveTextContent('Категори'));
  });

  it('should display error message when getCategories fetch fails', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesErrorMock]} addTypename={false}>
        <TestWrapper />
      </MockedProvider>
    );
    await waitFor(() => expect(getByTestId('create-food-category-select')).toHaveTextContent('Категори сонгоход алдаа гарлаа!'));
  });

  it('should disbale select button when category is null or empty', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCategoriesNullMock]} addTypename={false}>
        <TestWrapper />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('create-food-category-select')).toBeDisabled();
    });
  });

  describe('Loading state', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should show loading state initially', () => {
      const { getByTestId } = render(
        <MockedProvider mocks={[getCategoriesLoadingMock]} addTypename={false}>
          <TestWrapper />
        </MockedProvider>
      );
      expect(getByTestId('create-food-category-select')).toHaveTextContent('Loading...');
    });

    it('should show loading in dropdown when opened during loading', async () => {
      const { getByTestId } = render(
        <MockedProvider mocks={[getCategoriesLoadingMock]} addTypename={false}>
          <TestWrapper />
        </MockedProvider>
      );
      const categorySelect = getByTestId('create-food-category-select');
      await userEvent.click(categorySelect);

      expect(getByTestId('select-category-loading')).toBeInTheDocument();
      expect(getByTestId('select-category-loading')).toHaveTextContent('Loading...');
    });
  });
});
