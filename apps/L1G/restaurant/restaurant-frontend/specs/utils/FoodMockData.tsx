/* eslint max-lines: "off" */
import { DeleteFoodDocument, GetFoodsDocument, UpdateFoodDocument } from '@/generated';
import { MockedResponse } from '@apollo/client/testing';

const getFoodsMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  result: {
    data: {
      getFoods: [
        {
          foodId: '1',
          foodName: 'Test',
          price: '20000',
          status: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '1',
            categoryName: 'Dessert',
          },
        },
        {
          foodId: '2',
          foodName: 'Test1',
          price: '15000',
          status: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '2',
            categoryName: 'Main dish',
          },
        },
      ],
    },
  },
};

const getFoodsEmptyArrayMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  result: {
    data: {
      getFoods: [],
    },
  },
};

const deleteFoodByIdMock: MockedResponse = {
  request: {
    query: DeleteFoodDocument,
    variables: {
      foodId: '1',
    },
  },
  result: {
    data: {
      deleteFood: {
        foodId: '1',
        foodName: 'Test',
        price: '20000',
        status: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        category: {
          categoryId: '1',
          categoryName: 'Dessert',
        },
      },
    },
  },
};

const getFoodsAfterDeleteMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  result: {
    data: {
      getFoods: [
        {
          foodId: '2',
          foodName: 'Test1',
          price: '15000',
          status: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '2',
            categoryName: 'Main dish',
          },
        },
      ],
    },
  },
};

const deleteFoodErrorMock: MockedResponse = {
  request: {
    query: DeleteFoodDocument,
    variables: {
      foodId: '1',
    },
  },
  error: new Error('Error: Network error'),
};

const deleteFoodWithIdErrorMock: MockedResponse = {
  request: {
    query: DeleteFoodDocument,
    variables: {
      foodId: '1',
    },
  },
  error: new Error('Food with ID 1 not found'),
};

const getFoodsLoadingMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  delay: 1000,
  result: {
    data: {
      getFoods: [
        {
          foodId: '1',
          foodName: 'Test',
          price: '20000',
          status: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '1',
            categoryName: 'Dessert',
          },
        },
        {
          foodId: '2',
          foodName: 'Test1',
          price: '15000',
          status: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '2',
            categoryName: 'Main dish',
          },
        },
      ],
    },
  },
};

const getFoodsErrorMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  error: new Error('Network error'),
};

const updateFoodMock: MockedResponse = {
  request: {
    query: UpdateFoodDocument,
    variables: {
      foodId: '2',
      input: {
        foodName: 'Test1',
        price: '20000',
        status: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        categoryId: '2',
      },
    },
  },
  result: {
    data: {
      updateFood: {
        foodId: '2',
        foodName: 'Test1',
        price: '20000',
        status: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        category: {
          categoryId: '2',
          categoryName: 'Main dish',
        },
      },
    },
  },
};

const updateFoodErrorMock: MockedResponse = {
  request: {
    query: UpdateFoodDocument,
    variables: {
      foodId: '2',
      input: {
        foodName: 'Test3',
        price: '20000',
        status: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        categoryId: '2',
      },
    },
  },
  error: new Error('Network error'),
};

export {
  getFoodsMock,
  deleteFoodByIdMock,
  getFoodsAfterDeleteMock,
  deleteFoodErrorMock,
  deleteFoodWithIdErrorMock,
  getFoodsLoadingMock,
  getFoodsErrorMock,
  updateFoodMock,
  updateFoodErrorMock,
  getFoodsEmptyArrayMock,
};
