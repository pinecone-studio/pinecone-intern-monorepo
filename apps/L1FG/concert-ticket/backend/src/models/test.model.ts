import { model, models, Schema } from "mongoose"

export type TestType={
    name:string
    phoneNumber:number
    email:string
}
const testSchema= new Schema<TestType>({
    name:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    email:{
        type:String
    }
})
export const testModel= models['user'] || model('user', testSchema);