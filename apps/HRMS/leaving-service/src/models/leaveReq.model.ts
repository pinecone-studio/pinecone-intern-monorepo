import mongoose, { Schema, model } from 'mongoose';

export type LeaveReq = {
  _id: String;
  leaveType: String;
  employeeId: String;
  // date: Date;
  // startHour: Date;
  // totalHour: Date;
  // supervisor: String;
  // status: String;
  // declinedReasoning: String;
  // description: String;
  // createdAt: Date;
  // decidedAt: Date;
};

const LeaveReqSchema = new Schema<LeaveReq>({
  leaveType: {
    type: String,
    enum: Object.values([' SHIT_HAPPENED', 'REMOTE', 'MEDICAL', 'FAMILY_EMERGENCY', 'OTHERS']),
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  // startHour: {
  //   type: Date,
  //   required: true,
  // },
  // totalHour: {
  //   type: Date,
  //   required: true,
  // },
  // supervisor: {
  //   type: String,
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   enum: Object.values(['PENDING', 'APPROVED', 'DECLINED']),
  //   required: true,
  //   default: 'Pending',
  // },
  // declinedReasoning: {
  //   type: String,
  //   required: false,
  // },
  // description: {
  //   type: String,
  //   required: false,
  // },
  // createdAt: Date,
  // decidedAt: Date,
});

export const LeaveReqModel = mongoose.models.leaveReq || mongoose.model('leaveReq', LeaveReqSchema);
