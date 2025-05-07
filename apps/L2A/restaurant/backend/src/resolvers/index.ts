import { addCategory, deleteCategory, deleteProduct, updateCategory } from "./mutations";
import { addProduct } from "./mutations/add-product";
import { addTable } from "./mutations/add-table";
import { updateTable } from "./mutations/uptade-table";
import { deleteTable } from "./mutations/delete-table";
import { updateProduct } from "./mutations/update-product";

export const resolvers = {
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addTable,
    updateTable,
    deleteTable,
  },
};

