import { getAllProducts } from '../../../src/resolvers/queries'; 
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model');

describe('getAllProducts', () => {
  it('should return all products', async () => {
    const mockProducts = [
      { _id: '1', name: 'Product 1' },
      { _id: '2', name: 'Product 2' }
    ];

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getAllProducts();

    expect(result).toEqual(mockProducts);
    expect(productModel.find).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if fetching fails', async () => {
    (productModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getAllProducts()).rejects.toThrow('Error fetching all products');
  });
});
