import { updateProduct } from '../../../src/resolvers/mutations/update-product';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model');

describe('updateProduct', () => {
  const mockProduct = {
    _id: '12345',
    name: 'Test Product',
    price: 100,
    description: 'A test product',
    images: ['image1.jpg'],
    category: new Types.ObjectId(),
  };

  it('should update a product and return the updated product', async () => {
    (productModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockProduct);

    const result = await updateProduct(null, mockProduct);

    expect(result).toEqual(mockProduct);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProduct._id,
      {
        name: 'Test Product',
        price: 100,
        description: 'A test product',
        images: ['image1.jpg'],
        category: expect.anything(),
      },
      { new: true }
    );
  });

  it('should throw an error if the product does not exist', async () => {
    (productModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateProduct(null, mockProduct)).rejects.toThrowError('Product not found');
  });

  it('should throw an error if input is missing the product ID', async () => {
    const invalidInput = { ...mockProduct, _id: '' };

    await expect(updateProduct(null, invalidInput)).rejects.toThrowError('Product ID is required');
  });
});
