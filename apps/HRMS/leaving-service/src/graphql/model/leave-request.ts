import mongoose from 'mongoose';

const LeaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  leaveType: {
    type: String,
    enum: Object.values(['SHIT_HAPPENED', 'REMOTE', 'MEDICAL', 'FAMILY_EMERGENCY', 'OTHERS']),
    required: true,
  },
  date: { type: Date, default: Date.now },
  startHour: Date,
  totalHour: Number,
  description: String,
  status: {
    type: String,
    enum: Object.values(['PENDING', 'APPROVED', 'DECLINED']),
    default: 'PENDING',
  },
  declinedReasoning: String,
  createdAt: { type: Date, default: Date.now },
  decidedAt: { type: Date, default: Date.now },
});

const LeaveRequestModel = mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', LeaveRequestSchema);
export { LeaveRequestModel };
