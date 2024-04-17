import { Schema, model } from 'mongoose';

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
const sectionModel = model('section',sectionSchema)
export default sectionModel 