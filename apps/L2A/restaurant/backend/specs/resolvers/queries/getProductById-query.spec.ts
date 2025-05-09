import { getProductById } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model');
jest.mock('../../../src/utils/product-error');

describe('getProductById', () => {
  it('should return a product when found by id', async () => {
    const mockProduct = { id: '123', name: 'Sample Product' };
    (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductById(undefined, { id: '123' });

    expect(result).toEqual(mockProduct);
    expect(productModel.findById).toHaveBeenCalledWith('123');
  });

  it('should throw an error when the product is not found', async () => {
    (productModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getProductById(undefined, { id: '123' })).rejects.toThrow('Product not found');
  });

  it('should handle errors properly', async () => {
    const errorMessage = 'Database error';
    (productModel.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getProductById(undefined, { id: '123' })).rejects.toThrow('Product not found');
  });
});
