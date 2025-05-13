import { updateProduct } from '../../../src/resolvers/mutations/update-product';
import { productModel } from '../../../src/models/product.model';
import { Types } from 'mongoose';

jest.mock('../../../src/models/product.model');

describe('updateProduct', () => {
  const mockProduct = {
    _id: '12345',
    name: 'Test Product',
    price: 100,
    status: true,
    images: ['image1.jpg'],
    category: new Types.ObjectId(),
  };

  const input = {
    input: {
      _id: mockProduct._id,
      name: mockProduct.name,
      price: mockProduct.price,
      status: mockProduct.status,
      images: mockProduct.images,
      category: mockProduct.category.toString(),
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a product and return the updated product', async () => {
    (productModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockProduct);

    const result = await updateProduct(null, input);

    expect(result).toEqual(mockProduct);
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProduct._id,
      {
        name: mockProduct.name,
        price: mockProduct.price,
        status: mockProduct.status,
        images: mockProduct.images,
        category: expect.any(Types.ObjectId),
      },
      { new: true }
    );
  });

  it('should throw an error if the product does not exist', async () => {
    (productModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateProduct(null, input)).rejects.toThrow('Product not found');
  });

  it('should throw an error if productModel throws an unexpected error', async () => {
    const error = new Error('Database connection lost');
    (productModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

    await expect(updateProduct(null, input)).rejects.toThrow('Error updating product: Database connection lost');
  });

  it('should throw an error if input is missing the product ID', async () => {
    const invalidInput = {
      input: {
        ...input.input,
        _id: '',
      },
    };

    await expect(updateProduct(null, invalidInput)).rejects.toThrowError('Product ID is required');
  });
});
