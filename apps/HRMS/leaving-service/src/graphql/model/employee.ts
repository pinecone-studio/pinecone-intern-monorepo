import { Model, Schema, model, models } from 'mongoose';
import { Employee } from '../generated';

const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  department: {
    type: String,
    enum: ['SOFTWARE', 'DESIGN', 'MARKETING', 'BACK_OFFICE'],
  },
  jobTitle: [String],
  ladderLevel: String,
  salary: Number,
  phone: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

 const EmployeeModel: Model<Employee>= models.employee || model<Employee>('Employee', EmployeeSchema);
export default EmployeeModel