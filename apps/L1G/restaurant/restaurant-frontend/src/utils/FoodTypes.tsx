import { Food, GetCategoriesQuery, GetDiscountsQuery, GetFoodsQuery } from '@/generated';
import { formSchemaFood } from '@/helpers/form-schemas';
import { ApolloQueryResult } from '@apollo/client';
import { z } from 'zod';

type FoodUpdateDialogProps = {
  refetch: () => Promise<ApolloQueryResult<GetFoodsQuery>>;
  foodId: Food['foodId'];
  foodName: Food['foodName'];
  image: Food['image'];
  price: Food['price'];
  foodStatus: Food['foodStatus'];
  category: Food['category'];
};
type FoodUpdateFormProps = {
  foodName: string;
  price: string;
  image: string;
  category: {
    categoryId: string;
    categoryName: string;
  };
  foodStatus: string | string;
  onSubmit: (_values: z.infer<typeof formSchemaFood>) => void;
  isSubmitting: boolean;
};

type DiscountUpdateProps = {
  discountId: string;
  discountName: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  refetch: () => Promise<ApolloQueryResult<GetDiscountsQuery>>;
};

type CategoryUpdateProps = {
  categoryId: string;
  categoryName: string;
  refetch: () => Promise<ApolloQueryResult<GetCategoriesQuery>>;
};

export { type FoodUpdateDialogProps, type FoodUpdateFormProps, type DiscountUpdateProps, type CategoryUpdateProps };
