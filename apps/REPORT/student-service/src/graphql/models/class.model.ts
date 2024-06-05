import { Schema, model, models } from 'mongoose';

export const ClassSchema = new Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  type: {
    type: String,
    enum: ['CODE', 'DESIGN'],
    required: true,
  },
});

export const ClassModel = models.Request || model('Class', ClassSchema);
