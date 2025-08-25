import { Payment } from "src/models/payment.model";
import { 
  MutationCreatePaymentArgs, 
  MutationUpdatePaymentArgs, 
  MutationDeletePaymentArgs,
  ResolversParentTypes 
} from "../../../generated";

export const paymentMutations = {
  createPayment: async (
    _: ResolversParentTypes['Mutation'], 
    { ticketId, amount }: MutationCreatePaymentArgs
  ) => {
    try {
      const payment = new Payment({ 
        ticketId, 
        amount,
        status: 'PENDING'
      });
      
      const savedPayment = await payment.save();
      return savedPayment;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },
  
  updatePayment: async (
    _: ResolversParentTypes['Mutation'], 
    { _id, status }: MutationUpdatePaymentArgs
  ) => {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(_id, { status }, { new: true });
      if (!updatedPayment) {
        throw new Error('Payment not found');
      }
      return updatedPayment;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },
  
  deletePayment: async (
    _: ResolversParentTypes['Mutation'], 
    { _id }: MutationDeletePaymentArgs
  ) => {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(_id);
      if (!deletedPayment) {
        throw new Error('Payment not found');
      }
      return deletedPayment;
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  },
};
