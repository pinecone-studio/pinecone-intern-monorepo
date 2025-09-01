import { z } from 'zod';

const formSchemaUser = z
  .object({
    username: z.string().min(2, {
      message: 'Хэрэглэгчийн нэр оруулна уу!',
    }),
    email: z.string().email({ message: 'Имэйл хаяг буруу байна!' }),
    password: z.string().min(1, { message: 'Нууц үг оруулна уу!' }).min(6, { message: 'Нууц үг 6 тэмдэгтээс их байх ёстой!' }),
    confirmPassword: z.string().min(6, {
      message: 'Нууц үг давтан оруулна уу!',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Нууц үг таарахгүй байна!',
    path: ['confirmPassword'],
  });

const initialValuesUser = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const formSchemaFood = z.object({
  foodName: z.string().min(1, {
    message: 'Хоолны нэр оруулна уу!',
  }),
  price: z
    .string()
    .min(1, {
      message: 'Үнэ оруулна уу!',
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: 'Зөв үнэ оруулна уу!' }),
  status: z.enum(['Идэвхитэй', 'Идэвхигүй']),
  image: z.union([
    z.any().refine((file) => file instanceof File && file.size > 0, {
      message: 'Зураг оруулна уу!',
    }),
    z.string().url({ message: 'Зурагны URL буруу байна!' }),
  ]),
});

const initialValuesFood = {
  foodName: '',
  price: '',
  status: 'Идэвхитэй' as 'Идэвхитэй' | 'Идэвхигүй',
  image: undefined,
};

const formSchemaDiscount = z.object({
  discountName: z.string().min(2, {
    message: 'Хямдралын нэр оруулна уу!',
  }),
  discountRate: z.coerce
    .number()
    .min(1, {
      message: 'Хямдралын хувь оруулна уу!',
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: 'Зөв хувь оруулна уу!' }),
  discountDate: z
    .object({
      from: z.union([z.date(), z.string()]).optional(),
      to: z.union([z.date(), z.string()]).optional(),
    })
    .refine(
      (date) => {
        return date && date.from && date.to;
      },
      { message: 'Хугацаа сонгоно уу!' }
    ),
});

const initialValuesDiscount = {
  discountName: '',
  discountRate: 0,
  discountDate: {
    from: undefined,
    to: undefined,
  },
};

export { formSchemaUser, initialValuesUser, formSchemaFood, initialValuesFood, formSchemaDiscount, initialValuesDiscount };
