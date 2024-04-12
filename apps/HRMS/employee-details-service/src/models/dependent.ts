import { Dependent } from '@/graphql/generated';
import { Schema, model, models, Model } from 'mongoose';

const DependentSchema = new Schema<Dependent>({
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
