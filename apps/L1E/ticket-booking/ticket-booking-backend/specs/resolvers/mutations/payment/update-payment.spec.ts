import { paymentMutations } from '../../../../src/resolvers/mutations/payment/payment.mutation';
import { Payment } from '../../../../src/models/payment.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { PaymentType } from '../../../../src/models/payment.model';

describe('Update Payment Mutation', () => {
  let testPayment: PaymentType;

  beforeEach(async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };
    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
  });

  afterEach(async () => {
    if (testPayment?._id) {
      await Payment.deleteOne({ _id: testPayment._id });
    }
  });

  test('Should update payment status to COMPLETED successfully', async () => {
    const updateData = {
      _id: testPayment._id.toString(),
      status: 'COMPLETED'
    };

    const updatedPayment = await paymentMutations.updatePayment({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedPayment).toBeDefined();
    expect(updatedPayment.status).toBe('COMPLETED');
    expect(updatedPayment._id.toString()).toBe(testPayment._id.toString());
  });

  test('Should update payment status to FAILED successfully', async () => {
    const updateData = {
      _id: testPayment._id.toString(),
      status: 'FAILED'
    };

    const updatedPayment = await paymentMutations.updatePayment({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedPayment.status).toBe('FAILED');
    expect(updatedPayment._id.toString()).toBe(testPayment._id.toString());
  });

  test('Should throw error for non-existent payment', async () => {
    const updateData = {
      _id: '507f1f77bcf86cd799439011',
      status: 'COMPLETED'
    };

    await expect(paymentMutations.updatePayment({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Payment not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const updateData = {
      _id: 'invalid-id-format',
      status: 'COMPLETED'
    };

    await expect(paymentMutations.updatePayment({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Invalid ObjectId format');
  });

  test('Should return correct payment data after update', async () => {
    const updateData = {
      _id: testPayment._id.toString(),
      status: 'COMPLETED'
    };

    const updatedPayment = await paymentMutations.updatePayment({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedPayment).toHaveProperty('_id');
    expect(updatedPayment).toHaveProperty('ticketId');
    expect(updatedPayment).toHaveProperty('amount');
    expect(updatedPayment).toHaveProperty('status');
    expect(updatedPayment).toHaveProperty('createdAt');
    expect(updatedPayment).toHaveProperty('updatedAt');
  });
});
