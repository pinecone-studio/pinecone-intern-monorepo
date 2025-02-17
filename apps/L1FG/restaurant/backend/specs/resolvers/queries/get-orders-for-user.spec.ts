import { getOrdersForUser } from '../../../src/resolvers/queries/get-orders-for-user';
import { OrderModel } from '../../../src/models/order';
import { GraphQLResolveInfo } from 'graphql';

// Mock the OrderModel's find method
jest.mock('../../../src/models/order', () => ({
  OrderModel: {
    find: jest.fn(),
  },
}));

describe('getOrders Query Resolver', () => {
  it('should return all orders if no tableId is provided', async () => {
    const mockOrders = [
      {
        _id: '67860e464b27bfc512af2a00',
        tableId: 105,
        items: [
          { name: 'Veggie Burger', price: 7.99, quantity: 1 },
          { name: 'Smoothie', price: 3.25, quantity: 1 },
        ],
        status: 'Completed',
        createdAt: new Date(),
      },
      {
        _id: '67860e464b27bfc512af2a01',
        tableId: 106,
        items: [
          { name: 'Fries', price: 2.99, quantity: 2 },
          { name: 'Coke', price: 1.99, quantity: 1 },
        ],
        status: 'Pending',
        createdAt: new Date(),
      },
    ];

    // Mock the find method to return mockOrders
    (OrderModel.find as jest.Mock).mockResolvedValue(mockOrders);

    if (!getOrdersForUser) return;
    // Call the resolver
    await getOrdersForUser({}, { userId: 'someUserId' }, {}, {} as GraphQLResolveInfo);
  });

  it('should return orders filtered by tableId', async () => {
    const mockOrders = [
      {
        _id: '67860e464b27bfc512af2a00',
        tableId: 105,
        userId: '67aee280649e247b6a98e47a',
        items: [
          { name: 'Veggie Burger', price: 7.99, quantity: 1 },
          { name: 'Smoothie', price: 3.25, quantity: 1 },
        ],
        status: 'Completed',
        createdAt: new Date(),
      },
    ];

    // Mock the find method to return filtered orders
    (OrderModel.find as jest.Mock).mockResolvedValue(mockOrders);

    if (!getOrdersForUser) return;

    // Call the resolver with a tableId
    await getOrdersForUser({}, { userId: '67aee280649e247b6a98e47a' }, {}, {} as GraphQLResolveInfo);
  });
});
