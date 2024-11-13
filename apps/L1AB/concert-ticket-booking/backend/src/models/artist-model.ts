import { model, models, Schema } from 'mongoose';

export type ArtistType = {
  _id: string;

  additional: string;
  createdAt: Date;
  updatedAt: Date;
};
const ArtistSchema = new Schema({
  artistName: { type: String, required: true, default: 'Artist ner oruulaagvi bna' },
  image: { type: String, required: true, default: 'no image added' },
  additional: {
    type: String,
    required: true,
    default: ['no additional information added'],
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
