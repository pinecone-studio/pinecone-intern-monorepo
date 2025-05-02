import { getAllProducts, getProductById, getProductsByCategory } from '../../../src/resolvers/queries';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

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

  it('should get product by ID', async () => {
    const mockProduct = { _id: '123', name: 'Product A' };
    (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductById(undefined, { id: '123' });
    expect(productModel.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockProduct);
  });

  it('should get products by category', async () => {
    const mockProducts = [{ name: 'Product in Category' }];
    const categoryId = new Types.ObjectId().toString();

    (productModel.find as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProductsByCategory(undefined, { categoryId });
    expect(productModel.find).toHaveBeenCalledWith({ category: new Types.ObjectId(categoryId) });
    expect(result).toEqual(mockProducts);
  });
});
