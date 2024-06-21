import { Schema, model, models } from 'mongoose';

const glmsUserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ['TEACHER', 'STUDENT'],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const glmsUserModel = models.glmsUser || model('glmsUser', glmsUserSchema);
export default glmsUserModel;
