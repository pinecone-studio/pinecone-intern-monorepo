import { getProductById } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';

jest.mock('../../../src/models/product.model');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

it('should get product by ID', async () => {
    const mockProduct = { _id: '123', name: 'Product A' };
    (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductById(undefined, { id: '123' });
    expect(productModel.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockProduct);
  })
});