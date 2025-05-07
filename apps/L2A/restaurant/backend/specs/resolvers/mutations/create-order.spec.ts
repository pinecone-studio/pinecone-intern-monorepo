import { createOrder as createOrderResolver } from '../../../src/resolvers/mutations/create-order';
import { orderModel } from '../../../src/models/order.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/order.model');

const createOrder = createOrderResolver!;

describe('createOrder resolver', () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (orderModel.create as jest.Mock) = mockCreate;
  });

  it('should create an order and return the order object', async () => {
    const mockInput = {
      userId: 'user123',
      products: [
        { product: 'prod1', quantity: 1, priceWhenOrdered: 9.99 },
        { product: 'prod2', quantity: 2, priceWhenOrdered: 19.99 },
      ],
    };

    const mockOrder = {
      _id: 'order456',
      user: mockInput.userId,
      products: mockInput.products,
    };

    mockCreate.mockResolvedValue(mockOrder);

    const mockContext = {} as any;
    const mockInfo = {} as GraphQLResolveInfo;

    const result = await createOrder({}, mockInput, mockContext, mockInfo);

    expect(orderModel.create).toHaveBeenCalledWith({
      user: mockInput.userId,
      products: mockInput.products,
    });

    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order creation fails', async () => {
    const mockInput = {
      userId: 'user123',
      products: [{ product: 'prod1', quantity: 1, priceWhenOrdered: 9.99 }],
    };

    const mockContext = {} as any;
    const mockInfo = {} as GraphQLResolveInfo;

    const errorMessage = 'Database error';
    mockCreate.mockRejectedValue(new Error(errorMessage));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);

    await expect(createOrder({}, mockInput, mockContext, mockInfo)).rejects.toThrow('Failed to create order');

    expect(orderModel.create).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
