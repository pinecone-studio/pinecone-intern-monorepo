import { model, models, Schema, Types } from 'mongoose';

const foodSchema = new Schema({
  foodName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  categoryId: { type: Types.ObjectId, ref: 'Category' },  
  createdAt: { type: Date, default: Date.now },
});

export const FoodModel = models['Food'] || model('Food', foodSchema);
