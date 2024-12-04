import { model, models, Schema } from 'mongoose';

export type ArtistType = {
  _id: string;
  artistName: string;
  image: string;
  additional: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
const ArtistSchema = new Schema({
  artistName: { type: String, required: true, default: 'Artist ner oruulaagvi bna' },
  image: { type: String, required: true, default: 'no image added' },
  additional: {
    type: String,
    required: true,
    default: 'no additional information added',
  },
  status: {
    type: String,
    required: true,
    default: 'Энгийн', 
    enum: ['Энгийн', 'Устгагдсан'], 
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const ArtistModel = models['artist'] || model('artist', ArtistSchema);
