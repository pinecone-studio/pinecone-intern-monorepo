import { getProductsByCategory } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model', () => ({
  productModel: {
    find: jest.fn()
  }
}));

describe('getProductsByCategory', () => {
  const mockCategoryId = '6638b94a0a298e73a1f85b66';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return products when found', async () => {
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProductsByCategory(null, { categoryId: mockCategoryId });

    expect(productModel.find).toHaveBeenCalledWith({ category: expect.any(Object) });
    expect(result).toEqual(mockProducts);
  });

  it('should throw "Product not found" error when no products found', async () => {
    (productModel.find as jest.Mock).mockResolvedValue([]);

    await expect(
      getProductsByCategory(null, { categoryId: mockCategoryId })
    ).rejects.toThrow('Product not found');
  });

  it('should throw generic product error when other errors occur', async () => {
    (productModel.find as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(
      getProductsByCategory(null, { categoryId: mockCategoryId })
    ).rejects.toThrow('Product service error');
  });
});
