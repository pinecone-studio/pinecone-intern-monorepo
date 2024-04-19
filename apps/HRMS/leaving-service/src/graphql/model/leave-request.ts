import mongoose from 'mongoose';

const LeaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    ref: 'Employee',
  },
  startDate: Date,
  startHour: Number,
  endHour: Number,
  description: String,
  leaveType: {
    type: String,
    enum: Object.values(['SHIT_HAPPENED', 'REMOTE', 'MEDICAL', 'FAMILY_EMERGENCY', 'OTHERS']),
    required: true,
  },
  superVisor: String,
  durationType:{
    type: String,
    enum: Object.values(["Hour", "Day"])
  },
  status: {
    type: String,
    enum: Object.values(['PENDING', 'APPROVED', 'DECLINED']),
    default: 'PENDING',
  },
  totalHour: Number,
  createdAt: { type: Date, default: Date() },
  declinedReasoning: String,
  decidedAt: Date,
});

const LeaveRequestModel = mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', LeaveRequestSchema);
export { LeaveRequestModel };
