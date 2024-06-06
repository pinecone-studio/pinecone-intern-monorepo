import mongoose, { Schema, model } from 'mongoose';

const badWordSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
});
export const BadWordModel = mongoose.models.badWord || model('badWord', badWordSchema);
