import mongoose from "mongoose";


const POST_SCHEMA = new mongoose.Schema({
propertyOwnerId: {type: mongoose.Schema.Types.ObjectId, ref:'Users', required:true},
title: {type: String},
description: {type:String},
price: {type: Number},
propertyDetail: {type: mongoose.Schema.ObjectId, ref: 'PropertyFeature', required: true},
status: {type: String, enum: ['pending', 'approved', 'declined'], default:'pending'},
createdAt: {type : Date, default:Date.now},
updatedAt: {type : Date, default:Date.now}
})
export const postModel = mongoose.model('Posts', POST_SCHEMA)
