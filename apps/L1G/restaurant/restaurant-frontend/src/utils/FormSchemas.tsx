import { z } from 'zod';

const formSchemaFood = z.object({
  foodName: z.string().min(1, {
    message: 'Хоолны нэр оруулна уу',
  }),
  price: z
    .string()
    .min(1, {
      message: 'Үнэ оруулна уу',
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: 'Зөв үнэ оруулна уу' }),
  category: z.string().min(1, {
    message: 'Категори сонгоно уу',
  }),
  status: z.enum(['Идэвхитэй', 'Идэвхигүй']),
  image: z.any().refine((file) => file instanceof File && file.size > 0, {
    message: 'Зураг оруулна уу',
  }),
});

const initialValuesFood = {
  foodName: '',
  price: '',
  category: '',
  status: 'Идэвхитэй' as 'Идэвхитэй' | 'Идэвхигүй',
  image: undefined,
};

export { formSchemaFood, initialValuesFood };
