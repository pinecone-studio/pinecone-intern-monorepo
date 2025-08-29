import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';

export const Mocks = [
  {
    request: { query: GetCategoriesDocument },
    result: {
      data: {
        __typename: 'Query',
        getCategories: [
          { __typename: 'Category', categoryId: 'main', categoryName: 'Үндсэн хоол' },
          { __typename: 'Category', categoryId: 'coffee', categoryName: 'Кофе' },
        ],
      },
    },
  },
  {
    request: { query: GetFoodsDocument },
    result: {
      data: {
        __typename: 'Query',
        getFoods: [
          {
            __typename: 'Food',
            foodId: '1',
            foodName: 'Taco',
            price: '15.6к',
            image: 'https://via.placeholder.com/150',
            category: { __typename: 'Category', categoryId: 'main', categoryName: 'Үндсэн хоол' },
          },
          {
            __typename: 'Food',
            foodId: '2',
            foodName: 'Latte',
            price: '12к',
            image: 'https://via.placeholder.com/150',
            category: { __typename: 'Category', categoryId: 'coffee', categoryName: 'Кофе' },
          },
        ],
      },
    },
  },
];
