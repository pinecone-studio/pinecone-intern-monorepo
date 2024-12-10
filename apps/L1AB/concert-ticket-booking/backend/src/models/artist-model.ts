import { model, models, Schema } from 'mongoose';

export type ArtistType = {
  _id: string;
  artistName: string; 
  additional: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
const ArtistSchema = new Schema({
  artistName: {
    type: String,
    required: [true, 'Artist name is required'],
    default: 'No artist name provided',
  },
  additional: {
    type: String,
    required: [true, 'Additional information is required'],
    default: 'no additional information added',
  },
  status: {
    type: String,
    required: true,
    default: 'Энгийн', 
    enum: ['Энгийн', 'Идэвхгүй'], 
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
