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
  phone: String,
});

 const EmployeeModel: Model<Employee>= models.employee || model<Employee>('Employee', EmployeeSchema);
export default EmployeeModel