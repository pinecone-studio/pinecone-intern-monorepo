import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  PropertyOwnerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  desciption: { type: String, required: true },
  price: { type: Number, required: true },
  propertyDetail: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'DECLINED'], required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
