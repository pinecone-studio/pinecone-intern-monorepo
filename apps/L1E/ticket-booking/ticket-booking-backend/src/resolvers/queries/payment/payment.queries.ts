import { Payment } from "src/models/payment.model";
import { 
  QueryGetPaymentArgs,
  ResolversParentTypes 
} from "../../../generated"; 
import mongoose from 'mongoose';

export const paymentQueries = {
  getPayment: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetPaymentArgs
  ) => {
    try {
      // Check if _id is a valid ObjectId
      if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        return null;
      }
      return await Payment.findById(_id);
    } catch (error) {
      return null;
    }
  },
  
  getPayments: async (_: ResolversParentTypes['Query']) => {
    return await Payment.find();
  },
};
