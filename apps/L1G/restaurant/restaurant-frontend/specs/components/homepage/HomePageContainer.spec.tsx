import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HomePageContainer from '@/components/home/HomePageContainer';
import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';
import '@testing-library/jest-dom'; // toBeInTheDocument ашиглахад хэрэгтэй

const mocks = [
  {
    request: {
      query: GetCategoriesDocument,
    },
    result: {
      data: {
        getCategories: [
          {
            categoryId: 'main',
            categoryName: 'Үндсэн хоол',
            __typename: 'Category',
          },
          {
            categoryId: 'coffee',
            categoryName: 'Кофе',
            __typename: 'Category',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetFoodsDocument,
    },
    result: {
      data: {
        getFoods: [
          {
            foodId: '1',
            foodName: 'Taco',
            price: '15.6к',
            image: '',
            category: {
              categoryId: 'main',
              categoryName: 'Үндсэн хоол',
              __typename: 'Category',
            },
            __typename: 'Food',
          },
          {
            foodId: '2',
            foodName: 'Latte',
            price: '12к',
            image: '',
            category: {
              categoryId: 'coffee',
              categoryName: 'Кофе',
              __typename: 'Category',
            },
            __typename: 'Food',
          },
        ],
      },
    },
  },
];

describe('HomePageContainer', () => {
  it('should render foods and filter by category when a button is clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Taco'));
      expect(screen.getByText('Үндсэн хоол'));
      expect(screen.getByText('Кофе'));
    });

    fireEvent.click(screen.getByText('Кофе'));

    await waitFor(() => {
      expect(screen.getByText('Latte'));
      expect(screen.queryByText('Taco'));
    });
  });
});
it('should not set active category if categoryName is undefined', async () => {
  const brokenMocks = [
    {
      request: {
        query: GetCategoriesDocument,
      },
      result: {
        data: {
          getCategories: [
            {
              categoryId: 'unknown',
              categoryName: undefined, // intentionally broken
              __typename: 'Category',
            },
          ],
        },
      },
    },
    {
      request: {
        query: GetFoodsDocument,
      },
      result: {
        data: {
          getFoods: [],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={brokenMocks} addTypename={false}>
      <HomePageContainer />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('homepage-container-filter-button'));
  });

  fireEvent.click(screen.getByTestId('homepage-container-filter-button'));

  // Nothing should break. Just verify component is still on screen.
  expect(screen.getByText('Хоолны цэс'));
});
