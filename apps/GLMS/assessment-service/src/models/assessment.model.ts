import { Assessment } from '@/graphql/generated';
import { Schema, model, models } from 'mongoose';

const AssessmentSchema = new Schema<Assessment>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const AssessmentModel = models.Assessment || model<Assessment>('Assessment', AssessmentSchema);

export default AssessmentModel;
