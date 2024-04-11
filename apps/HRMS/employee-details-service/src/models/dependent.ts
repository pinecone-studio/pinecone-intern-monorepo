import { Schema, model, models, Model } from 'mongoose';

export type Dependent = {
  _id: String;
  firstName: String;
  lastName: String;
  phone: String;
  dependency: String;
};

const DependentSchema = new Schema<Dependent>({
  _id: String,
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  dependency: {
    type: String,
  },
});
export const DependentModel: Model<Dependent> = models['Dependent'] || model<Dependent>('Dependent', DependentSchema);
