import mongoose, { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  requirements: [
    {
      skill: String,
      education: String,
      language: String,
      qualification: String,
      workExperience: String,
      others: String,
    },
  ],
  minSalary: {
    type: String,
    require: true,
  },
  maxSalary: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

export const job = mongoose.models.job || model('job', jobSchema);
