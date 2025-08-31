/* eslint max-lines: "off" */
import { CreateCategoryDocument, CreateDiscountDocument, CreateFoodDocument, DeleteFoodDocument, GetFoodsDocument, UpdateFoodDocument } from '@/generated';
import { MockedResponse } from '@apollo/client/testing';

const createFoodMock: MockedResponse = {
  request: {
    query: CreateFoodDocument,
    variables: {
      input: {
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
      },
    },
  },
  result: {
    data: {
      createFood: {
        foodId: '1',
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        category: {
          categoryId: '1',
          categoryName: 'Dessert',
        },
        discount: {
          discountId: '1',
          discountName: 'New',
          discountRate: 10,
          startDate: new Date('9/21/2025'),
          endDate: new Date('9/21/2025'),
        },
      },
    },
  },
};

const createFoodErrorMock: MockedResponse = {
  request: {
    query: CreateFoodDocument,
    variables: {
      input: {
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
      },
    },
  },
  error: new Error('Network error'),
};

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
            discountRate: 10,
            startDate: new Date('9/21/2025'),
            endDate: new Date('9/21/2025'),
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
            discountName: 'Test',
            discountRate: 10,
            startDate: new Date('9/21/2025'),
            endDate: new Date('9/21/2025'),
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
        discount: {
          discountId: '1',
          discountName: 'Test',
          discountRate: 10,
          startDate: new Date('9/21/2025'),
          endDate: new Date('9/21/2025'),
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
          discount: {
            discountId: '1',
            discountName: 'Test',
            discountRate: 10,
            startDate: new Date('9/21/2025'),
            endDate: new Date('9/21/2025'),
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
          categoryId: '1',
          categoryName: 'Dessert',
        },
        discount: {
          discountId: '1',
          discountName: 'New',
          discountRate: 10,
          startDate: new Date('9/21/20205'),
          endDate: new Date('9/21/20205'),
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

const createDiscountMock: MockedResponse = {
  request: {
    query: CreateDiscountDocument,
    variables: {
      input: {
        discountName: 'Test',
        discountRate: 20,
        startDate: new Date('9/21/2025').toLocaleString(),
        endDate: new Date('9/21/2025').toLocaleString(),
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
        startDate: new Date('9/21/2025'),
        endDate: new Date('9/21/2025'),
      },
    },
  },
  error: new Error('Network error'),
};

export {
  createFoodMock,
  createFoodErrorMock,
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
};
