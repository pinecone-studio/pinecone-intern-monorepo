import { getAllProducts } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';
import { ProductError } from '../../../src/utils/product-error';
jest.mock('../../../src/models/product.model');
jest.mock('../../../src/utils/product-error');

describe('getAllProducts', () => {
  it('should return all products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' },
    ];

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getAllProducts();

    expect(result).toEqual(mockProducts);
    expect(productModel.find).toHaveBeenCalled();
  });

  it('should handle errors properly', async () => {
    const errorMessage = 'Database error';
    (productModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getAllProducts()).resolves.toBeUndefined();
    expect(ProductError).toHaveBeenCalledWith(expect.any(Error), 'Product not found');
  });
});
