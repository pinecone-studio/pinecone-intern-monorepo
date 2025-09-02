/* eslint max-lines: "off" */
import { AddFoodToCategoryDocument, AddFoodToDiscountDocument, DeleteFoodFromCategoryDocument, DeleteFoodFromDiscountDocument } from '@/generated';

const deleteFoodFromCategoryMock = {
  request: {
    query: DeleteFoodFromCategoryDocument,
    variables: {
      categoryId: '1',
      foodId: '1',
    },
  },
  result: {
    data: {
      deleteFoodFromCategory: {
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

const deleteFoodFromCategoryErrorMock = {
  request: {
    query: DeleteFoodFromCategoryDocument,
    variables: {
      categoryId: '1',
      foodId: '1',
    },
  },
  error: new Error('Network error'),
};

const deleteFoodFromDiscountMock = {
  request: {
    query: DeleteFoodFromDiscountDocument,
    variables: {
      discountId: '1',
      foodId: '1',
    },
  },
  result: {
    data: {
      deleteFoodFromDiscount: {
        discountId: '1',
        discountName: 'New',
        discountRate: 10,
        startDate: new Date().toLocaleString(),
        endDate: new Date().toLocaleString(),
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

const deleteFoodFromDiscountErrorMock = {
  request: {
    query: DeleteFoodFromDiscountDocument,
    variables: {
      discountId: '1',
      foodId: '1',
    },
  },
  error: new Error('Network error'),
};

const addFoodToCategoryMock = {
  request: {
    query: AddFoodToCategoryDocument,
    variables: {
      categoryId: '1',
      foodId: '1',
    },
  },
  result: {
    data: {
      addFoodToCategory: {
        foodId: '1',
        foodName: 'Test1',
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

const addFoodToDiscountMock = {
  request: {
    query: AddFoodToDiscountDocument,
    variables: {
      discountId: '1',
      foodId: '1',
    },
  },
  result: {
    data: {
      addFoodToCategory: {
        foodId: '1',
        foodName: 'Test1',
        price: '20000',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        discount: {
          discountId: '1',
          discountName: 'New',
          discountRate: 10,
          startDate: new Date().toLocaleString(),
          endDate: new Date().toLocaleString(),
        },
      },
    },
  },
};

const addFoodToCategoryErrorMock = {
  request: {
    query: AddFoodToCategoryDocument,
    variables: {
      categoryId: '1',
      foodId: '1',
    },
  },
  error: new Error('Network error'),
};

const addFoodToDiscountErrorMock = {
  request: {
    query: AddFoodToDiscountDocument,
    variables: {
      discountId: '1',
      foodId: '1',
    },
  },
  error: new Error('Network error'),
};

export {
  deleteFoodFromCategoryMock,
  deleteFoodFromCategoryErrorMock,
  deleteFoodFromDiscountMock,
  deleteFoodFromDiscountErrorMock,
  addFoodToCategoryMock,
  addFoodToDiscountMock,
  addFoodToCategoryErrorMock,
  addFoodToDiscountErrorMock,
};
