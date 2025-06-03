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
    (productModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockProducts),
    });
    const result = await getProducts();

    expect(result).toEqual(mockProducts);
  });

  it('should throw an error if fetching fails', async () => {
    (productModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Error')),
    });

    await expect(getProducts()).rejects.toThrow('Error');
  });
});
