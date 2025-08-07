import { z } from 'zod';

const formSchemaFood = z.object({
  foodName: z.string().min(1, {
    message: 'Хоолны нэр оруулна уу',
  }),
  price: z.string().min(1, {
    message: 'Үнэ оруулна уу',
  }),
  category: z.string({
    required_error: 'Категори сонгоно уу',
  }),
  status: z.enum(['Идэвхитэй', 'Идэвхигүй']),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).transform((FileList) => FileList[0]),
});

const InitialValuesFood = {
  foodName: '',
  price: '',
  category: '',
  status: 'Идэвхитэй',
};
export { formSchemaFood, InitialValuesFood };
