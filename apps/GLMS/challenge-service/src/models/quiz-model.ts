import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid';

const QuizSchema = new mongoose.Schema({
    _id: {type: String, default: ()=> uuidv4()},
    lessonId: {type: String, ref: 'GLMS-Lessons' },
    questions: {type: String, ref: 'GLMS-Questions'}
})

export const QuizModel = mongoose.models['GLMS-Quiz'] || mongoose.model('GLMS-Quiz', QuizSchema)
