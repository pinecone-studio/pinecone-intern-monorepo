import '@testing-library/jest-dom';
import { SelectCategoryInput } from '@/components/admin';
import { GetCategoriesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockDataProps = {
  onchange: () => null,
  defaultValue: 'test',
};
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
          categoryName: 'Dish',
        },
      ],
    },
  },
};

describe('SelectCategoryInput', () => {
  it('should render', async () => {
    render(
      <MockedProvider mocks={[getCategoriesMock]} addTypename={false}>
        <SelectCategoryInput onChange={mockDataProps.onchange} defaultValue={mockDataProps.defaultValue} />
      </MockedProvider>
    );

    const selectTrigger = await screen.findByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();
    fireEvent.click(selectTrigger);

    await waitFor(() => screen.debug());

    const dessertOption = await screen.findByText('Dessert');
    const dishOption = await screen.findByText('Dish');

    expect(dessertOption).toBeInTheDocument();
    expect(dishOption).toBeInTheDocument();
  });
});
