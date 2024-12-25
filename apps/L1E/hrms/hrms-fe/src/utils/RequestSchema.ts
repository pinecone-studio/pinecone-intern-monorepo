import { z } from 'zod';
const requestSchema = z.object({
  date: z.date().refine((date) => date > new Date(), {
    message: 'өдөр сонгоно уу',
  }),
  startTime: z.string().nonempty('Start time is required'),
  endTime: z.string().nonempty('End time is required'),
  leadEmployeeId: z.string().nonempty('сонголт хийгээгүй байна'),
  reason: z.string().min(5, 'хоосон байна'),
  employeeId: z.string(),
  requestStatus:z.string()
});
export default requestSchema;
