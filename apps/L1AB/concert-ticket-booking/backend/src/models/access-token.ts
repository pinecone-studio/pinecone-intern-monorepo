import { Schema, model, models } from 'mongoose';

export type AccessTokenType = {
  email: string;
  accessToken: string;
  createdAt: Date;
};

const AccessTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m',
  },
});

export const accessTokenModel = models['accessTokens'] || model('accessTokens', AccessTokenSchema);
