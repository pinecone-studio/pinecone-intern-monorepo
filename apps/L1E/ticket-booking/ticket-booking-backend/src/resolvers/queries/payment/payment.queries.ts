import { Payment } from "src/models/payment.model";
import { 
  QueryGetPaymentArgs,
  ResolversParentTypes 
} from "../../../generated"; 

export const paymentQueries = {
  getPayment: async (
    _: ResolversParentTypes['Query'], 
    { _id }: QueryGetPaymentArgs
  ) => {
    return await Payment.findById(_id);
  },
  
  getPayments: async (_: ResolversParentTypes['Query']) => {
    return await Payment.find();
  },
};
