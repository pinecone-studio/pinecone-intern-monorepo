import { Model, Schema, model, models } from 'mongoose';
import { Applicant } from '@/graphql/generated';

const applicantSchema = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  cv: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },

  //   jobId: {
  //     type: Schema.Types.ObjectId,
  //     // required: true,
  //     ref: 'Job',
  //   },
});

export const ApplicantModel: Model<Applicant> = models['Applicant'] || model<Applicant>('Applicant', applicantSchema);
