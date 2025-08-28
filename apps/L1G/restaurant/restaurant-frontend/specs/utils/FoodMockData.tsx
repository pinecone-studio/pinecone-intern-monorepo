/* eslint max-lines: "off" */
import {
  CreateCategoryDocument,
  CreateDiscountDocument,
  DeleteFoodDocument,
  GetCategoriesDocument,
  GetDiscountsDocument,
  GetFoodsDocument,
  UpdateCategoryDocument,
  UpdateDiscountDocument,
  UpdateFoodDocument,
} from '@/generated';
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
          foodStatus: 'Идэвхитэй',
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
          foodStatus: 'Идэвхитэй',
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
        foodStatus: 'Идэвхитэй',
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
          foodStatus: 'Идэвхитэй',
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
          foodStatus: 'Идэвхитэй',
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
        foodStatus: 'Идэвхитэй',
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
        foodStatus: 'Идэвхитэй',
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
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        categoryId: '2',
      },
    },
  },
  error: new Error('Network error'),
};

const createCategoryMock: MockedResponse = {
  request: {
    query: CreateCategoryDocument,
    variables: {
      input: {
        categoryName: 'Dessert',
      },
    },
  },
  result: {
    data: {
      createCategory: {
        categoryId: '4',
        categoryName: 'Dessert',
      },
    },
  },
};

const createCategoryErrorMock: MockedResponse = {
  request: {
    query: CreateCategoryDocument,
    variables: {
      input: {
        categoryName: 'Dessert',
      },
    },
  },
  error: new Error('Network error'),
};

const createDiscountMock: MockedResponse = {
  request: {
    query: CreateDiscountDocument,
    variables: {
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('9/28/2025').toLocaleString(),
        endDate: new Date('9/28/2025').toLocaleString(),
      },
    },
  },
  result: {
    data: {
      createDiscount: {
        discountId: '2',
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('').toLocaleString(),
        endDate: new Date('').toLocaleString(),
      },
    },
  },
};

const createDiscountErrorMock: MockedResponse = {
  request: {
    query: CreateCategoryDocument,
    variables: {
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('9/28/2025'),
        endDate: new Date('9/28/2025'),
      },
    },
  },
  error: new Error('Network error'),
};

const updateCategoryMock: MockedResponse = {
  request: {
    query: UpdateCategoryDocument,
    variables: {
      categoryId: '2',
      input: {
        categoryName: 'Test1',
      },
    },
  },
  result: {
    data: {
      updateCategory: {
        categoryId: '2',
        categoryName: 'Test1',
      },
    },
  },
};

const updateCategoryErrorMock: MockedResponse = {
  request: {
    query: UpdateCategoryDocument,
    variables: {
      categoryId: '2',
      input: {
        categoryName: 'Test1',
      },
    },
  },
  error: new Error('Network error'),
};

const updateDiscountMock: MockedResponse = {
  request: {
    query: UpdateDiscountDocument,
    variables: {
      discountId: '2',
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date(parseInt('1756425600000')).toLocaleString(),
        endDate: new Date(parseInt('1756512000000')).toLocaleString(),
      },
    },
  },
  result: {
    data: {
      updateDiscount: {
        discountId: '2',
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('').toLocaleString(),
        endDate: new Date('').toLocaleString(),
      },
    },
  },
};

const updateDiscountErrorMock: MockedResponse = {
  request: {
    query: UpdateDiscountDocument,
    variables: {
      discountId: '2',
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('8/29/2025').toLocaleString(),
        endDate: new Date('8/30/2025').toLocaleString(),
      },
    },
  },
  error: new Error('Network error'),
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
          categoryName: 'Main dish',
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

const getDiscountsMock: MockedResponse = {
  request: {
    query: GetDiscountsDocument,
  },
  result: {
    data: {
      getDiscounts: [
        {
          discountId: '2',
          discountName: 'Test',
          discountRate: 20,
          startDate: new Date(parseInt('1756425600000')).toLocaleString(),
          endDate: new Date(parseInt('1756512000000')).toLocaleString(),
        },
        {
          discountId: '3',
          discountName: 'Test',
          discountRate: 20,
          startDate: new Date(parseInt('1756425600000')).toLocaleString(),
          endDate: new Date(parseInt('1756512000000')).toLocaleString(),
        },
      ],
    },
  },
};

const getDiscountsErrorMock: MockedResponse = {
  request: {
    query: GetDiscountsDocument,
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
  createCategoryMock,
  createCategoryErrorMock,
  createDiscountMock,
  createDiscountErrorMock,
  updateCategoryMock,
  updateCategoryErrorMock,
  updateDiscountMock,
  updateDiscountErrorMock,
  getDiscountsMock,
  getDiscountsErrorMock,
  getCategoriesMock,
  getCategoriesErrorMock,
};
