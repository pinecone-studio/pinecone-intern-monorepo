import { productModel } from "../../models/product.model";

export const getProducts = async () => {
  try {
    return await productModel.find();
  } catch (error) {
    throw new Error(`Error fetching products: ${(error as Error).message}`);
  }
};