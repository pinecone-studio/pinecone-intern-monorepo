import { z } from 'zod';
const requestSchemaDay = z.object({
  refuse: z.string().min(5, 'хоосон байна'),
});
export default requestSchemaDay;
