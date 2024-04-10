import { Schema, model, models, Model } from 'mongoose';

export type Dependent = {
  _id: String;
  firstname: String;
  lastname: String;
  phone: String;
  dependency: String;
};

const DependentSchema = new Schema<Dependent>({
  _id: String,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dependency: {
    type: String,
    required: true,
  },
});
export const DependentModel: Model<Dependent> = models['Dependent'] || model<Dependent>('Dependent', DependentSchema);
