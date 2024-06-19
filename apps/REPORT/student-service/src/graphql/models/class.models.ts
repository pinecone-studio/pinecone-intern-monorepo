import mongoose, { Schema, model } from 'mongoose';

export const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
    enum: ['CODING', 'DESIGN'],
  },
  teachers: { type: [String], required: true },
});
export const ClassesModel = mongoose.models.classes || model('classes', classSchema);
