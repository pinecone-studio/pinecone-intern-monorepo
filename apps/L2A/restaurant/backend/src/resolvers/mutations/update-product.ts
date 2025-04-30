import { ProductInput } from '../../models/product.model';
import { validateUpdateInput } from '../../utils/validate-update-input'; 
import { productModel } from '../../models/product.model';
import { buildUpdateData } from '../../utils/build-update-data';


export const updateProduct = async (_: unknown, input: ProductInput) => {
  validateUpdateInput(input);
  return await updateProductInDB(input);
};

export const updateProductInDB = async (input: ProductInput) => {
  const updateData = buildUpdateData(input);

  const updatedProduct = await productModel.findByIdAndUpdate(
    input._id,
    updateData,
    { new: true }
  );

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
}