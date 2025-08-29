import { paymentMutations } from '../../../../src/resolvers/mutations/payment/payment.mutation';
import { Payment } from '../../../../src/models/payment.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { PaymentType } from '../../../../src/models/payment.model';

describe('Create Payment Mutation', () => {
  let testPayment: PaymentType;

  afterEach(async () => {
    if (testPayment?._id) {
      await Payment.deleteOne({ _id: testPayment._id });
    }
  });

  test('Should create a new payment successfully', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };

    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    
    expect(testPayment).toBeDefined();
    expect(testPayment.ticketId.toString()).toBe('507f1f77bcf86cd799439011');
    expect(testPayment.amount).toBe(50.00);
    expect(testPayment.status).toBe('PENDING');
  });

  test('Should create payment with high amount', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 9999.99
    };

    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    
    expect(testPayment.amount).toBe(9999.99);
    expect(testPayment.status).toBe('PENDING');
  });

  test('Should create payment with zero amount', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 0.00
    };

    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    
    expect(testPayment.amount).toBe(0.00);
    expect(testPayment.status).toBe('PENDING');
  });

  test('Should return correct payment data after creation', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };

    testPayment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    
    expect(testPayment).toHaveProperty('_id');
    expect(testPayment).toHaveProperty('ticketId');
    expect(testPayment).toHaveProperty('amount');
    expect(testPayment).toHaveProperty('status');
    expect(testPayment).toHaveProperty('createdAt');
    expect(testPayment).toHaveProperty('updatedAt');
  });

  test('Should handle database error during creation', async () => {
    const originalSave = Payment.prototype.save;
    Payment.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));
    
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };

    await expect(paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData))
      .rejects.toThrow('Database error');
    
    Payment.prototype.save = originalSave;
  });
});
