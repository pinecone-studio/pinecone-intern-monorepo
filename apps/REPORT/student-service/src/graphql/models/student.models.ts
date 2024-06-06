import mongoose, { Schema, model } from 'mongoose';

export const studentsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentCode: {
    type: String,
    required: true,
  },
  profileImgUrl: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: Boolean(true),
  },
});
export const StudentsModel = mongoose.models.comments || model('students', studentsSchema);
