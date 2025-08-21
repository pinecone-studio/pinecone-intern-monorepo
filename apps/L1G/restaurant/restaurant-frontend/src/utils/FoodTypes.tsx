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
  status: Food['status'];
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
  status: string | string;
  onSubmit: (values: z.infer<typeof formSchemaFood>) => void;
  isSubmitting: boolean;
};

const statusOptions = [
  { id: 'active', label: 'Идэвхитэй', value: 'Идэвхитэй' },
  {
    id: 'inactive',
    label: 'Идэвхигүй',
    value: 'Идэвхигүй',
  },
];
export { type FoodUpdateDialogProps, type FoodUpdateFormProps, statusOptions };
