import { getAllProducts } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all products', async () => {
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getAllProducts();
    expect(productModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});