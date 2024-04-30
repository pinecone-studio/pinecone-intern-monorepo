import { Model, Schema, model, models } from 'mongoose';
import { Job } from '@/graphql/generated';

const jobSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  requirements: {
    skill: String,
    education: String,
    language: String,
    qualification: String,
    workExperience: String,
    others: String,
  },
  minSalary: {
    type: String,
    require: true,
  },
  maxSalary: {
    type: String,
    require: true,
  },
  dueDate: {
    type: Date,
    default: new Date(),
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    require: true,
  },
});

export const JobModel: Model<Job> = models['Job'] || model<Job>('Job', jobSchema);
