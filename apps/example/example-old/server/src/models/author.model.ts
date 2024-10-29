import { Schema, model } from 'mongoose';

export type Author = {
  _id: string;
  name: string;
};

const AuthorSchema = new Schema<Author>({
  name: {
    type: String,
    required: true,
  },
});

export const AuthorModel = model<Author>('Author', AuthorSchema);
