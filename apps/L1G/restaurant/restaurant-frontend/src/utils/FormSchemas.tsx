import { z } from 'zod';

const formSchemaFood = z
  .object({
    foodName: z.string().min(1, {
      message: 'Хоолны нэр оруулна уу',
    }),
    price: z.string().min(1, {
      message: 'Үнэ оруулна уу',
    }),
    category: z.string().min(1, {
      message: 'Категори сонгоно уу',
    }),
    status: z.enum(['Идэвхитэй', 'Идэвхигүй']),
    image: z.instanceof(File, { message: 'Зураг оруулна уу' }).optional(),
  })
  .refine((data) => data.image instanceof File, {
    message: 'Зураг оруулна уу',
    path: ['image'],
  });

const initialValuesFood = {
  foodName: '',
  price: '',
  category: '',
  status: 'Идэвхитэй' as 'Идэвхитэй' | 'Идэвхигүй',
  image: undefined as File | undefined,
};

export { formSchemaFood, initialValuesFood };
