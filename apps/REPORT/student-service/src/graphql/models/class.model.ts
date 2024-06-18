import { Schema, model, models } from 'mongoose';

export const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  teachers: {
    type: [String],
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    enum: ['CODING', 'DESIGN'],
  },
});
export const ClassModel = models.class || model('class', classSchema);
