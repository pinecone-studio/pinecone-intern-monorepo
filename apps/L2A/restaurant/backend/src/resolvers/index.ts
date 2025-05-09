import { addCategory, deleteCategory, deleteProduct, updateCategory } from "./mutations";
import { addProduct } from "./mutations/add-product";
import { updateProduct } from "./mutations/update-product";
import { getAllProducts, getProductById, getProductsByCategory } from "./queries";

export const resolvers = {
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  },
  Query: {
    getAllProducts,
    getProductById,
    getProductsByCategory,
  }
}
