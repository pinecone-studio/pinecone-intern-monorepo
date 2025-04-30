import { ProductInput } from '../../models/product.model';
import { validateUpdateInput } from '../../utils/validate-update-input'; 
import { updateProductInDB } from '../../services/product.service';

export const updateProduct = async (_: unknown, input: ProductInput) => {
  validateUpdateInput(input);
  return await updateProductInDB(input);
};