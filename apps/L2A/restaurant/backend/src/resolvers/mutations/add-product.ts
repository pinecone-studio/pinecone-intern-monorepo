import { ProductInput } from '../../models/product.model';
import { validateProductInput } from '../../utils/validate-product-input';
import { createProduct } from '../../services/product.service';

export const addProduct = async (_: unknown, input: ProductInput) => {
  validateProductInput(input);
  return await createProduct(input);
};
