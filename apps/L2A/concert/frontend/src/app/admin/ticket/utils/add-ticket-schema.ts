import z from 'zod';

export const AddTicketSchema = z.object({
  title: z.string().min(4, { message: 'Нэр заавал 3-аас дээш байх шаардлагатай!' }),
  description: z.string().min(15, { message: 'Дор хаяж 15 үсэг оруулах шаадлагатай!' }),
  thumbnailUrl: z.string().url({ message: 'Холбоос биш байна!' }),
  musicStart: z.string().min(5, 'Цаг сонгоно уу!'),
  venueName: z.string().min(1, { message: 'Хаягийн нэр оруулна уу!' }),
  venueAddress: z.string().min(1, 'Хаяг оруулна уу!'),
  venueCity: z.string().min(1, { message: 'Хот оруулна уу!' }),
  venueCapacity: z.number().min(1, { message: 'Багтаамж оруулна уу!' }),
  artistName: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулах шаадлагатай!' }),
  specialGuestName: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулах шаадлагатай!' }).optional(),
  endDate: z.string().min(5, 'Цаг сонгоно уу!'),
  startDate: z.string().min(5, 'Цаг сонгоно уу!'),
  AvialableTicketCountBackSeat: z.number().min(1, { message: 'Арын суудлын тоо оруулах ёстой!' }),
  BackSeatTicketPrice: z.number().min(4, 'Дор хаяж 1000 төгрөг оруулна уу!'),
  ticketCountVip: z.number().min(1, { message: 'VIP суудлын тоо оруулах ёстой!' }),
  VIPTicketPrice: z.number().min(4, 'Дор хаяж 1000 төгрөг оруулна уу!'),
  AvialableTicketCountStandard: z.number().min(1, { message: 'Энгийн суудлын тоо оруулах ёстой!' }),
  StandardTicketPrice: z.number().min(4, 'Дор хаяж 1000 төгрөг оруулна уу!'),
});
