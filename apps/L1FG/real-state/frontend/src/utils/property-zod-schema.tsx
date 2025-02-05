import { z } from 'zod';
import { HouseTypeEnum } from '@/generated';

export const estateSchema = z.object({
  title: z.string().min(1, 'Гарчиг оруулна уу'),
  price: z.coerce.number().min(0, 'Үнэ оруулна уу'),
  description: z.string().min(1, 'Тайлбар оруулна уу'),
  images: z
    .any()
    .refine((files) => files?.length > 0, 'Зураг оруулна уу')
    .refine((files) => {
      if (!files) return false;
      return Array.from(files).every((file) => file instanceof File);
    }, 'Зөвхөн зураг оруулна уу'),
  houseType: z.nativeEnum(HouseTypeEnum),
  size: z.coerce.number().min(0, 'Талбайн хэмжээг оруулна уу'),
  totalRooms: z.coerce.number().min(0, 'Өрөөний тоог оруулна уу'),
  garage: z.boolean(),
  restrooms: z.coerce.number().min(0),
  subDistrict: z.string().min(1, 'Дүүрэг оруулна уу'),
  district: z.string().min(1, 'Хороо оруулна уу'),
  city: z.string().min(1, 'Хот оруулна уу'),
  address: z.string().min(1, 'Хаяг оруулна уу'),
  completionDate: z.string(),
  windowsCount: z.number().min(0),
  windowType: z.string(),
  floorMaterial: z.string(),
  floorNumber: z.number().min(0),
  balcony: z.string(),
  totalFloors: z.number().min(0),
  lift: z.string(),
});

export type EstateFormData = z.infer<typeof estateSchema>;
