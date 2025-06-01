import { Schema, model, models } from 'mongoose';

const RequestSchema = new Schema(
  {
    concert: {
      type: Schema.Types.ObjectId,
      ref: 'Concert',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['APPROVED', 'PENDING'],
      default: 'PENDING',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const RequestModel = models.Request || model('Request', RequestSchema);
