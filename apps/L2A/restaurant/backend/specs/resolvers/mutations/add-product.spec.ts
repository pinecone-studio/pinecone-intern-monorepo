import { addProduct } from '../../../src/resolvers/mutations/add-product';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';
import { createProduct } from '../../../src/utils/create-product';

jest.mock('../../../src/models/product.model', () => ({
  productModel: {
    create: jest.fn(),
  },
}));

describe('Product resolvers', () => {
  const mockCreate = productModel.create as jest.Mock;

  const input = {
    name: 'Test Product',
    price: 100,
    status: true,
    images: ['img1.jpg'],
    category: new Types.ObjectId().toHexString(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should create and return a product', async () => {
      const mockProduct = { ...input, _id: 'prod123' };
      mockCreate.mockResolvedValue(mockProduct);

      const result = await createProduct(input);

      expect(mockCreate).toHaveBeenCalledWith({
        name: input.name,
        price: input.price,
        status: input.status,
        images: input.images,
        category: expect.any(Types.ObjectId),
      });

      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if creation fails', async () => {
      mockCreate.mockRejectedValue(new Error('DB error'));

      await expect(createProduct(input)).rejects.toThrow('Error creating product: DB error');
    });
  });

  describe('addProduct', () => {
    it('should call createProduct and return result', async () => {
      const mockProduct = { ...input, _id: 'prod123' };
      mockCreate.mockResolvedValue(mockProduct);

      const result = await addProduct(undefined, { input });

      expect(result).toEqual(mockProduct);
    });

    it('should throw error if createProduct throws', async () => {
      mockCreate.mockRejectedValue(new Error('DB fail'));

      await expect(addProduct(undefined, { input })).rejects.toThrow('Error adding product: Error creating product: DB fail');
    });
  });
});
