import { Schema, model } from 'mongoose';

const SecretGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  secrets: {
    test: {
      type: Schema.Types.Mixed,
      required: true,
    },
    prod: {
      type: Schema.Types.Mixed,
      required: true,
    },
    dev: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SecretGroupModel = model('SecretGroup', SecretGroupSchema);
