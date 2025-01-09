import mongoose, { model, models, Schema } from "mongoose";

const  requestSchema = new Schema({
    from: {type: mongoose.Types.ObjectId, ref:"User"},
    to:{type: mongoose.Types.ObjectId, ref:"User"},
    status:{type:String, enum:["accept", "pending", "remove"]} 
})

export const RequestModel = models["Request"] || model("Request", requestSchema)