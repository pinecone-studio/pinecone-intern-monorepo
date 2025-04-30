import { productModel, ProductType } from '../../../src/models/product.model';
import { deleteProduct } from '../../../src/resolvers/mutations/delete-product';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model', () => ({
  productModel: {
    findByIdAndDelete: jest.fn(),
  },
}));
describe('deleteProduct', () => {
  it('should delete the product and return it', async () => {
    const mockProduct: ProductType = {
      _id: '123',
      name: 'Test Product',
      price: 1000,
      description: 'A product for testing',
      images: ['image1.jpg'],
      category: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (productModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockProduct);
    const result = await deleteProduct('123');
    expect(result).toEqual(mockProduct);
    expect(productModel.findByIdAndDelete).toHaveBeenCalledWith('123');
  });
  it('should throw an error if the product is not found', async () => {
    (productModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
    await expect(deleteProduct('123')).rejects.toThrow('Product not found');
  });
});
