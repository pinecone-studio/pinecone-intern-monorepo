import { productModel } from '../../models/product.model';  
import { ProductType } from '../../models/product.model'; 

export const deleteProduct = async (_id: string): Promise<ProductType | null> => {
  const product = await productModel.findByIdAndDelete(_id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}