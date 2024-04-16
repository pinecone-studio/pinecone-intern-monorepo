import { categoryModel } from "@/models/category.model"

export const categoryQuery = async () => {
    const categories = await categoryModel.find()
    return categories
}