import { productModel } from "../../models/product.model";

export const getProductById = async (_: unknown, { id }: { id: string }) => {
  try {
    return await productModel.findById(id);
  } catch (error) {
    throw new Error(`Error getting product: ${(error as Error).message}`);
  }
};