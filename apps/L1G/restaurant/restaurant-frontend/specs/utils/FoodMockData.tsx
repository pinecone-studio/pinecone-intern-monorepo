/* eslint max-lines: "off" */
import {
  CreateCategoryDocument,
  CreateDiscountDocument,
  DeleteCategoryDocument,
  DeleteDiscountDocument,
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
          discount: {
            discountId: '1',
            discountName: 'Test',
            discountRate: 20,
            startDate: new Date('').toLocaleString(),
            endDate: new Date('').toLocaleString(),
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
          discount: {
            discountId: '2',
            discountName: 'Test2',
            discountRate: 20,
            startDate: new Date('').toLocaleString(),
            endDate: new Date('').toLocaleString(),
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

const today = new Date();
const startDay = today.getDate() + 1;
const endDay = today.getDate() + 2;

const startDate = new Date(`9/${startDay}/2025`);
const endDate = new Date(`9/${endDay}/2025`);

const createDiscountMock: MockedResponse = {
  request: {
    query: CreateDiscountDocument,
    variables: {
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: startDate.toLocaleString(),
        endDate: endDate.toLocaleString(),
      },
    },
  },
  result: {
    data: {
      createDiscount: {
        discountId: '2',
        discountName: 'Test',
        discountRate: 20,
        startDate: startDate.toLocaleString(),
        endDate: endDate.toLocaleString(),
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
        startDate: startDate.toLocaleString(),
        endDate: endDate.toLocaleString(),
      },
    },
  },
  error: new Error('Network error'),
};

const updateCategoryMock: MockedResponse = {
  request: {
    query: UpdateCategoryDocument,
    variables: {
      categoryId: '1',
      input: {
        categoryName: 'Dessert',
      },
    },
  },
  result: {
    data: {
      updateCategory: {
        categoryId: '1',
        categoryName: 'Dessert',
        food: {
          foodId: '2',
          foodName: 'Test1',
          price: '20000',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
      },
    },
  },
};

const updateCategoryErrorMock: MockedResponse = {
  request: {
    query: UpdateCategoryDocument,
    variables: {
      categoryId: '1',
      input: {
        categoryName: 'Dessert',
      },
    },
  },
  error: new Error('Network error'),
};

const updateDiscountMock: MockedResponse = {
  request: {
    query: UpdateDiscountDocument,
    variables: {
      discountId: '1',
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date(parseInt('1/1/1970')).toLocaleString(),
        endDate: new Date(parseInt('1/1/1970')).toLocaleString(),
      },
    },
  },
  result: {
    data: {
      updateDiscount: {
        discountId: '1',
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
      discountId: '1',
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date(parseInt('1/1/1970')).toLocaleString(),
        endDate: new Date(parseInt('1/1/1970')).toLocaleString(),
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
          food: [
            {
              foodId: '1',
              foodName: 'Test1',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
            {
              foodId: '2',
              foodName: 'Test2',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
          ],
        },
        {
          categoryId: '2',
          categoryName: 'Main',
          food: [
            {
              foodId: '3',
              foodName: 'Test3',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
          ],
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
          discountId: '1',
          discountName: 'New',
          discountRate: 20,
          startDate: new Date('').toLocaleString(),
          endDate: new Date('').toLocaleString(),
          food: [
            {
              foodId: '1',
              foodName: 'Taco',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
            {
              foodId: '2',
              foodName: 'Tapa',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
          ],
        },
        {
          discountId: '2',
          discountName: 'Seasonal',
          discountRate: 20,
          startDate: new Date('').toLocaleString(),
          endDate: new Date('').toLocaleString(),
          food: [
            {
              foodId: '3',
              foodName: 'Salad',
              price: '20000',
              foodStatus: 'Идэвхитэй',
              image: 'https://example.com/foodimage.jpg',
            },
          ],
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

const deleteCategoryByIdMock: MockedResponse = {
  request: {
    query: DeleteCategoryDocument,
    variables: {
      categoryId: '1',
    },
  },
  result: {
    data: {
      deleteCategory: {
        categoryId: '1',
        categoryName: 'Dessert',
        food: {
          foodId: '1',
          foodName: 'Test1',
          price: '20000',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
      },
    },
  },
};

const deleteCategoryErrorMock: MockedResponse = {
  request: {
    query: DeleteCategoryDocument,
    variables: {
      categoryId: '1',
    },
  },
  error: new Error('Network error'),
};

const deleteDiscountByIdMock: MockedResponse = {
  request: {
    query: DeleteDiscountDocument,
    variables: {
      discountId: '1',
    },
  },
  result: {
    data: {
      deleteDiscount: {
        discountId: '1',
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('').toLocaleString(),
        endDate: new Date('').toLocaleString(),
        food: {
          foodId: '1',
          foodName: 'Test1',
          price: '20000',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
        },
      },
    },
  },
};

const deleteDiscountErrorMock: MockedResponse = {
  request: {
    query: DeleteDiscountDocument,
    variables: {
      discountId: '1',
    },
  },
  error: new Error('Network error'),
};

const getCategoriesAfterDeleteMock: MockedResponse = {
  request: {
    query: GetCategoriesDocument,
  },
  result: {
    data: {
      getCategopries: [
        {
          categoryId: '2',
          categoryName: 'Main',
          food: {
            foodId: '2',
            foodName: 'Test2',
            price: '20000',
            foodStatus: 'Идэвхитэй',
            image: 'https://example.com/foodimage.jpg',
          },
        },
      ],
    },
  },
};

const getDiscountsAfterDeleteMock: MockedResponse = {
  request: {
    query: GetDiscountsDocument,
  },
  result: {
    data: {
      getDiscounts: [
        {
          discountId: '2',
          discountName: 'Test2',
          discountRate: 20,
          startDate: new Date('').toLocaleString(),
          endDate: new Date('').toLocaleString(),
          food: {
            foodId: '2',
            foodName: 'Test2',
            price: '20000',
            foodStatus: 'Идэвхитэй',
            image: 'https://example.com/foodimage.jpg',
          },
        },
      ],
    },
  },
};

const getFoodsWithShortPriceMock: MockedResponse = {
  request: {
    query: GetFoodsDocument,
  },
  result: {
    data: {
      getFoods: [
        {
          foodId: '1',
          foodName: 'Test',
          price: '200',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '1',
            categoryName: 'Dessert',
          },
          discount: {
            discountId: '1',
            discountName: 'Test',
            discountRate: 20,
            startDate: new Date('').toLocaleString(),
            endDate: new Date('').toLocaleString(),
          },
        },
        {
          foodId: '2',
          foodName: 'Test1',
          price: '500',
          foodStatus: 'Идэвхитэй',
          image: 'https://example.com/foodimage.jpg',
          category: {
            categoryId: '2',
            categoryName: 'Main dish',
          },
          discount: {
            discountId: '2',
            discountName: 'Test2',
            discountRate: 20,
            startDate: new Date('').toLocaleString(),
            endDate: new Date('').toLocaleString(),
          },
        },
      ],
    },
  },
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
  updateDiscountErrorMock,
  updateCategoryErrorMock,
  updateDiscountMock,
  getCategoriesMock,
  getCategoriesErrorMock,
  getDiscountsMock,
  getDiscountsErrorMock,
  deleteCategoryByIdMock,
  getDiscountsAfterDeleteMock,
  getCategoriesAfterDeleteMock,
  deleteDiscountByIdMock,
  deleteCategoryErrorMock,
  deleteDiscountErrorMock,
  getFoodsWithShortPriceMock,
};
