import { Food, GetFoodsQuery } from '@/generated';
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
};
type FoodUpdateFormProps = {
  foodName: string;
  price: string;
  image: string;
  foodStatus: string | string;
  onSubmit: (_values: z.infer<typeof formSchemaFood>) => void;
  loading: boolean;
};

export { type FoodUpdateDialogProps, type FoodUpdateFormProps };
