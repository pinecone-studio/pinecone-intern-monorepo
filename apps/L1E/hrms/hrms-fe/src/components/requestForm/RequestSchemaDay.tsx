import { z } from 'zod';
const requestSchemaDay = z.object({
  date: z.date().refine((date) => date > new Date(), {
    message: 'өдөр сонгоно уу',
  }),
  lead: z.string().nonempty('сонголт хийгээгүй байна'),
  notes: z.string().min(5, 'хоосон байна'),
});
export default requestSchemaDay;
