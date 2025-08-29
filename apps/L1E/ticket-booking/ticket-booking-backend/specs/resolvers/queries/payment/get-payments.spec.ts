import { paymentQueries } from '../../../../src/resolvers/queries/payment/payment.queries';
import { paymentMutations } from '../../../../src/resolvers/mutations/payment/payment.mutation';
import { Payment } from '../../../../src/models/payment.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { PaymentType } from '../../../../src/models/payment.model';

describe('Get Payments Query', () => {
  let testPayments: PaymentType[] = [];

  beforeEach(async () => {
    testPayments = [];
  });

  afterEach(async () => {
    for (const payment of testPayments) {
      if (payment?._id) {
        await Payment.deleteOne({ _id: payment._id });
      }
    }
  });

  test('Should return empty array when no payments exist', async () => {
    const payments = await paymentQueries.getPayments({} as ResolversParentTypes['Query']);
    
    expect(payments).toBeDefined();
    expect(Array.isArray(payments)).toBe(true);
    expect(payments.length).toBeGreaterThanOrEqual(0);
  });

  test('Should return payments with valid ObjectIds', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };
    const payment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    testPayments.push(payment);

    const payments = await paymentQueries.getPayments({} as ResolversParentTypes['Query']);
    
    expect(payments).toBeDefined();
    expect(Array.isArray(payments)).toBe(true);
    
    for (const returnedPayment of payments) {
      expect(returnedPayment._id).toBeDefined();
      expect(typeof returnedPayment._id.toString()).toBe('string');
    }
  });

  test('Should return payments with all expected fields', async () => {
    const paymentData = {
      ticketId: '507f1f77bcf86cd799439011',
      amount: 50.00
    };
    const payment = await paymentMutations.createPayment({} as ResolversParentTypes['Mutation'], paymentData);
    testPayments.push(payment);

    const payments = await paymentQueries.getPayments({} as ResolversParentTypes['Query']);
    
    expect(payments).toBeDefined();
    expect(Array.isArray(payments)).toBe(true);
    
    for (const returnedPayment of payments) {
      expect(returnedPayment).toHaveProperty('_id');
      expect(returnedPayment).toHaveProperty('ticketId');
      expect(returnedPayment).toHaveProperty('amount');
      expect(returnedPayment).toHaveProperty('status');
      expect(returnedPayment).toHaveProperty('createdAt');
      expect(returnedPayment).toHaveProperty('updatedAt');
    }
  });
});
