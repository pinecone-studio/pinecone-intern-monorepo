import { getOrders } from '../../../src/resolvers/queries/get-orders';
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

    if (!getOrders) return;
    // Call the resolver
    const result = await getOrders({}, { tableId: undefined }, {}, {} as GraphQLResolveInfo);

    // Assertions
    expect(result).toEqual([
      {
        _id: '67860e464b27bfc512af2a00',
        items: [
          { name: 'Veggie Burger', price: 7.99, quantity: 1 },
          { name: 'Smoothie', price: 3.25, quantity: 1 },
        ],
        status: 'Completed',
        createdAt: expect.any(String),
        tableId: 105,
      },
      {
        _id: '67860e464b27bfc512af2a01',
        items: [
          { name: 'Fries', price: 2.99, quantity: 2 },
          { name: 'Coke', price: 1.99, quantity: 1 },
        ],
        status: 'Pending',
        createdAt: expect.any(String),
        tableId: 106,
      },
    ]);

    // Ensure that find was called with no parameters (empty query)
    expect(OrderModel.find).toHaveBeenCalledWith({});
  });

  it('should return orders filtered by tableId', async () => {
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
    ];

    // Mock the find method to return filtered orders
    (OrderModel.find as jest.Mock).mockResolvedValue(mockOrders);

    if (!getOrders) return;

    // Call the resolver with a tableId
    const result = await getOrders({}, { tableId: 105 }, {}, {} as GraphQLResolveInfo);

    // Assertions
    expect(result).toEqual([
      {
        _id: '67860e464b27bfc512af2a00',
        items: [
          { name: 'Veggie Burger', price: 7.99, quantity: 1 },
          { name: 'Smoothie', price: 3.25, quantity: 1 },
        ],
        status: 'Completed',
        createdAt: expect.any(String),
        tableId: 105,
      },
    ]);

    // Ensure that find was called with tableId filter
    expect(OrderModel.find).toHaveBeenCalledWith({ tableId: 105 });
  });
});
