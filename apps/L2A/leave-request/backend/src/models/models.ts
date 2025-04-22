import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    profilePicture: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const leaveRequestSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requestType: { type: Schema.Types.ObjectId, ref: 'RequestType', required: true },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date): boolean {
          return value > new Date();
        },
        message: 'Start date must be in the future.',
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date): boolean {
          return value > new Date() && value > (this as any).startDate;
        },
        message: 'End date must be after the current date and the start date.',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const requestTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    limit: { type: Number, required: true },
    period: {
      type: String,
      enum: ['day', 'week', 'month', 'yearly'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
const LeaveRequest = mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', leaveRequestSchema);
const RequestType = mongoose.models.RequestType || mongoose.model('RequestType', requestTypeSchema);

export { User, LeaveRequest, RequestType };
