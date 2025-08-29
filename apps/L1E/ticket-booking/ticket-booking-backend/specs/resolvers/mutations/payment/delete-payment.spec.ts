import { paymentMutations } from '../../../../src/resolvers/mutations/payment/payment.mutation';
import { Payment } from '../../../../src/models/payment.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { PaymentType } from '../../../../src/models/payment.model';

describe('Delete Payment Mutation', () => {
  let testPayment: PaymentType;

  beforeEach(async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };
    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
  });

  test('Should delete payment successfully', async () => {
    const deleteData = {
      _id: testPayment._id.toString()
    };

    const deletedPayment = await paymentMutations.deletePayment({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedPayment).toBeDefined();
    expect(deletedPayment._id.toString()).toBe(testPayment._id.toString());
    expect(deletedPayment.ticketId.toString()).toBe(testPayment.ticketId.toString());
    expect(deletedPayment.amount).toBe(testPayment.amount);
    expect(deletedPayment.status).toBe(testPayment.status);

    const paymentInDb = await Payment.findById(testPayment._id);
    expect(paymentInDb).toBeNull();
  });

  test('Should throw error for non-existent payment', async () => {
    const deleteData = {
      _id: '507f1f77bcf86cd799439011'
    };

    await expect(paymentMutations.deletePayment({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow('Payment not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const deleteData = {
      _id: 'invalid-id-format'
    };

    await expect(paymentMutations.deletePayment({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow('Invalid ObjectId format');
  });

  test('Should return correct payment data after deletion', async () => {
    const deleteData = {
      _id: testPayment._id.toString()
    };

    const deletedPayment = await paymentMutations.deletePayment({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedPayment).toHaveProperty('_id');
    expect(deletedPayment).toHaveProperty('ticketId');
    expect(deletedPayment).toHaveProperty('amount');
    expect(deletedPayment).toHaveProperty('status');
    expect(deletedPayment).toHaveProperty('createdAt');
    expect(deletedPayment).toHaveProperty('updatedAt');
  });
});
