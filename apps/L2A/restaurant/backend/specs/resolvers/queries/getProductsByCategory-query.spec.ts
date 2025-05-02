import { getProductsByCategory } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  }); 

it('should get products by category', async () => {
    const mockProducts = [{ name: 'Product in Category' }];
    const categoryId = new Types.ObjectId().toString();

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProductsByCategory(undefined, { categoryId });
    expect(productModel.find).toHaveBeenCalledWith({ category: new Types.ObjectId(categoryId) });
    expect(result).toEqual(mockProducts);
  })
});