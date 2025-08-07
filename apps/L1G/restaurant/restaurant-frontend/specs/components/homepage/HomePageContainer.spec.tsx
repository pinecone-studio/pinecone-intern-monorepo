// import HomePageContainer from '@/components/home/HomePageContainer';
// import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';
// import { MockedProvider } from '@apollo/client/testing';
// import '@testing-library/jest-dom';
// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// const mockhandleOnClick = jest.fn();
// const mocks = [
//   {
//     request: {
//       query: GetCategoriesDocument,
//     },
//     result: {
//       data: {
//         categories: [
//           { id: 'main', name: 'Үндсэн', __typename: 'Category' },
//           { id: 'coffee', name: 'Кофе, цай', __typename: 'Category' },
//         ],
//       },
//     },
//   },
//   {
//     request: {
//       query: GetFoodsDocument,
//     },
//     result: {
//       data: {
//         foods: [
//           { id: 1, name: 'Taco', price: '15.6к', image: '', category: 'main', __typename: 'Food' },
//           { id: 2, name: 'Latte', price: '12к', image: '', category: 'coffee', __typename: 'Food' },
//         ],
//       },
//     },
//   },
// ];

// describe('HomePageContainer', () => {
//   it('should render successfully', async () => {
//     render(<HomePageContainer />);
//   });
// });

// describe('HomePageContainer (GraphQL-connected)', () => {
//   it('renders foods and filters by category when button is clicked', async () => {
//     render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <HomePageContainer />
//       </MockedProvider>
//     );

//     // Wait foods and categories to appear
//     await waitFor(() => {
//       expect(screen.getByText('Taco'));
//       expect(screen.getByTestId('category-button-coffee'));
//     });

//     // Click on 'Кофе, цай' category button
//     fireEvent.click(screen.getByTestId('category-button-coffee'));

//     // Taco should disappear, Latte should appear
//     await waitFor(() => {
//       expect(screen.queryByText('Local Mushroom Taco'));
//       expect(screen.getByText('Latte'));
//     });
//   });
// });
// __tests__/HomePageContainer.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HomePageContainer from '@/components/home/HomePageContainer';
import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';

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

    // 🕒 Foods and categories should appear
    await waitFor(() => {
      expect(screen.getByText('Taco'));
      expect(screen.getByText('Үндсэн хоол'));
      expect(screen.getByText('Кофе'));
    });

    // 👉 Click on "Кофе" category
    fireEvent.click(screen.getByText('Кофе'));

    // ✅ Latte should appear, Taco should disappear
    await waitFor(() => {
      expect(screen.queryByText('Taco'));
      expect(screen.getByText('Latte'));
    });
  });
});
