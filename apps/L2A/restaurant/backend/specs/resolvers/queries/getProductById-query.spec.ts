import { getProductById } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model');

describe('getProductById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return product if found', async () => {
    const mockProductId = new Types.ObjectId().toString();
    const mockProduct = { _id: mockProductId, name: 'Test Product' };

    (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductById(null, { id: mockProductId });

    expect(result).toEqual(mockProduct);
    expect(productModel.findById).toHaveBeenCalledWith(mockProductId);
  });

  it('should throw "Product not found" error if no product is found', async () => {
    const mockProductId = new Types.ObjectId().toString();

    (productModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getProductById(null, { id: mockProductId }))
      .rejects
      .toThrow('Product not found');
  });

  it('should throw "Error fetching product by ID" if a database error occurs', async () => {
    const mockProductId = new Types.ObjectId().toString();

    (productModel.findById as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(getProductById(null, { id: mockProductId }))
      .rejects
      .toThrow('Error fetching product by ID');
  });
});
