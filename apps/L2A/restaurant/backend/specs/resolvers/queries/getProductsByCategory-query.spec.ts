import { getProductsByCategory } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model');

describe('getProductsByCategory', () => {
  it('should return products when products are found for the given category', async () => {
    const mockCategoryId = new Types.ObjectId().toString();
    const mockProducts = [
      { _id: new Types.ObjectId(), name: 'Product 1', category: mockCategoryId },
      { _id: new Types.ObjectId(), name: 'Product 2', category: mockCategoryId },
    ];

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProductsByCategory(null, { categoryId: mockCategoryId });

    expect(result).toEqual(mockProducts);
    expect(productModel.find).toHaveBeenCalledWith({ category: new Types.ObjectId(mockCategoryId) });
  });

  it('should throw an error if no products are found for the given category', async () => {
    const mockCategoryId = new Types.ObjectId().toString();

    (productModel.find as jest.Mock).mockResolvedValue([]);

    await expect(getProductsByCategory(null, { categoryId: mockCategoryId }))
      .rejects
      .toThrow('Product not found');
  });

  it('should throw an error if there is an issue fetching products', async () => {
    const mockCategoryId = new Types.ObjectId().toString();

    (productModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getProductsByCategory(null, { categoryId: mockCategoryId }))
      .rejects
      .toThrow('Error fetching products by category');
  });
});
