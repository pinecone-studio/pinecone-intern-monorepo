import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid'

const OptionSchema = new mongoose.Schema({
    _id: {type: String, default: ()=> uuidv4()},
    questionId: {type: String, ref: 'GLMS-Questions'},
    optionText: String,
    isCorrect: Boolean,
    createdAt: {type: Date, default: () => new Date()},
    updatedAt: {type: Date, default: () => new Date()},
})

export const OptionModel = mongoose.models['GLMS-Option'] || mongoose.model('GLMS-Option', OptionSchema)