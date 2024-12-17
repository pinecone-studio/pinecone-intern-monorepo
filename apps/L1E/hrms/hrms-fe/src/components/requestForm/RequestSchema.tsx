import { z } from 'zod';

const requestSchema = z.object({
  date: z.date().refine((date) => date > new Date(), {
    message: 'өдөр сонгоно уу',
  }),
  startTime: z.string().nonempty('Start time is required'),
  endTime: z.string().nonempty('End time is required'),
  lead: z.string().nonempty('сонголт хийгээгүй байна'),
  notes: z.string().min(5, 'хоосон байна'),
});

export default requestSchema;
