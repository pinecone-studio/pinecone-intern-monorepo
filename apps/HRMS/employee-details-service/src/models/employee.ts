import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  imageUrl: String,
  department: {
    type: String,
    enum: ['SOFTWARE', 'DESIGN', 'MARKETING', 'BACK_OFFICE'],
  },
  jobTitle: [String],
  ladderLevel: String,
  salary: String,
  bankName: String,
  bankAccountNumber: String,
  bankAccountHolderName: String,
  dateOfEmployment: {
    type: Date,
    default: Date.now(),
  },
  dateOfReleased: Date,
  employmentStatus: {
    type: String,
    enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'ARCHIVE'],
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
  },
  dateOfBirth: Date,
  registrationNumber: String,
  phone: String,
  MaritalStatus: {
    type: String,
    enum: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'],
  },
  relative: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dependent',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const EmployeeModel = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
export { EmployeeModel };
