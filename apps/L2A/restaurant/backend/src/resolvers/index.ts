import { addCategory, deleteCategory, deleteProduct, updateCategory } from "./mutations";
import { addProduct } from "./mutations/add-product";
import { updateProduct } from "./mutations/update-product";

export const resolvers = {
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  },
};

