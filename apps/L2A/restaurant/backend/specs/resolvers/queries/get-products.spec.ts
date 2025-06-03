import { getProducts } from '../../../src/resolvers/queries/get-products';
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model');
describe('products resolver - get all products', () => {
  const mockProducts = [
    { _id: '1', name: 'Product One' },
    { _id: '2', name: 'Product Two' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProducts();

    expect(productModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it('should throw an error if fetching fails', async () => {
    (productModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getProducts()).rejects.toThrow();
  });
});
