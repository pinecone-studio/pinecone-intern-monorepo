import { GraphQLResolveInfo } from 'graphql';
import { OrderModel } from '../../../src/models/order';
import { makeOrder } from '../../../src/resolvers/mutations/make-order';

// Mock the create method on the OrderModel
jest.mock('../../../src/models/order', () => ({
  OrderModel: {
    create: jest.fn(),
  },
}));

describe('makeOrder Mutation Resolver', () => {
  it('should create a new order and return the order data', async () => {
    const input = {
      tableId: 105,
      items: [
        { name: 'Veggie Burger', price: 7.99, quantity: 1 },
        { name: 'Smoothie', price: 3.25, quantity: 1 },
      ],
    };

    const savedOrder = {
      _id: '67860e464b27bfc512af2a00',
      tableId: 105,
      items: [
        { name: 'Veggie Burger', price: 7.99, quantity: 1 },
        { name: 'Smoothie', price: 3.25, quantity: 1 },
      ],
      status: 'Pending',
      createdAt: new Date(),
    };

    (OrderModel.create as jest.Mock).mockResolvedValue(savedOrder);

    const result = await makeOrder!({}, { input }, {}, {} as GraphQLResolveInfo);

    // Assertions
    expect(result).toEqual({
      _id: savedOrder._id,
      items: savedOrder.items,
      createdAt: savedOrder.createdAt,
      status: savedOrder.status,
      tableId: savedOrder.tableId,
    });

    // Ensure create was called with the correct arguments
    expect(OrderModel.create).toHaveBeenCalledWith({
      tableId: 105,
      items: [
        { name: 'Veggie Burger', price: 7.99, quantity: 1 },
        { name: 'Smoothie', price: 3.25, quantity: 1 },
      ],
      status: 'Pending',
      createdAt: expect.any(Date),
    });
  });
});
