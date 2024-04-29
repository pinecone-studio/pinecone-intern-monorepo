import { Section } from '@/graphql/generated';
import { Model,Schema, model, models } from 'mongoose';

const sectionSchema = new Schema({
    title: {
        type: String,
      },
    contentImage:{
        type:String
    },
    description:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const sectionModel: Model<Section> =  models.section || model<Section>('section',sectionSchema) 
export default sectionModel 