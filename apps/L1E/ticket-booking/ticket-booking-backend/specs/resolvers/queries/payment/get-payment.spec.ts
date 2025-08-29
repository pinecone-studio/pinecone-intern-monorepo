import { paymentQueries } from '../../../../src/resolvers/queries/payment/payment.queries';
import { paymentMutations } from '../../../../src/resolvers/mutations/payment/payment.mutation';
import { Payment } from '../../../../src/models/payment.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { PaymentType } from '../../../../src/models/payment.model';

describe('Get Payment Query', () => {
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

  test('Should get payment by ID successfully', async () => {
    const queryArgs = {
      _id: testPayment._id.toString()
    };

    const retrievedPayment = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedPayment).toBeDefined();
    expect(retrievedPayment._id.toString()).toBe(testPayment._id.toString());
    expect(retrievedPayment.ticketId.toString()).toBe(testPayment.ticketId.toString());
    expect(retrievedPayment.amount).toBe(testPayment.amount);
    expect(retrievedPayment.status).toBe(testPayment.status);
  });

  test('Should return null for non-existent payment', async () => {
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const retrievedPayment = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedPayment).toBeNull();
  });

  test('Should handle invalid ObjectId format', async () => {
    const queryArgs = {
      _id: 'invalid-id-format'
    };

    const retrievedPayment = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedPayment).toBeNull();
  });

  test('Should return payment with all expected fields', async () => {
    const queryArgs = {
      _id: testPayment._id.toString()
    };

    const retrievedPayment = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    if (retrievedPayment) {
      expect(retrievedPayment).toHaveProperty('_id');
      expect(retrievedPayment).toHaveProperty('ticketId');
      expect(retrievedPayment).toHaveProperty('amount');
      expect(retrievedPayment).toHaveProperty('status');
      expect(retrievedPayment).toHaveProperty('createdAt');
      expect(retrievedPayment).toHaveProperty('updatedAt');
    }
  });

  test('Should handle null _id parameter', async () => {
    const queryArgs = {
      _id: null as unknown as string
    };

    const result = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(result).toBeNull();
  });

  test('Should handle database error gracefully', async () => {
    const mockFindById = jest.spyOn(Payment, 'findById').mockRejectedValueOnce(new Error('Database error'));
    
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const result = await paymentQueries.getPayment({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(result).toBeNull();
    mockFindById.mockRestore();
  });
});
