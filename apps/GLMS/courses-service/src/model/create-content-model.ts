import { Schema, model } from 'mongoose';

const contentSchema = new Schema({
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
const contentModel = model('content',contentSchema)
export default contentModel 